import React, { Fragment, useEffect, useRef, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { BsChatHeart } from 'react-icons/bs';
import { IoIosArrowBack, IoIosInformationCircleOutline, IoIosSend, IoMdAdd } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { leaveChatRoom, sendImageMessage, sendStudentMessage } from '../../../api/chat';
import { matchingRequest } from '../../../api/match';
import { useViewport } from '../../../hooks';
import useChatContext from '../../../hooks/useChatContext';
import { AppDispatch, RootState } from '../../../redux/config/configStore';
import { clearModal, displayToastAsync, openModal } from '../../../redux/modules';
import supabase from '../../../supabase';
import { getDateTextFromISODate, isSameDate } from '../../../utils/Date';
import ChatMessage from './ChatMessage';
import * as S from './ChatRoom.styled';

const ChatRoom = ({ userId }: { userId: string }) => {
  const { isMobile } = useViewport();
  const { chatRoom, chatMessages } = useChatContext();
  const [inputMessage, setInputMessage] = useState('');
  const [isOpenInputMenu, setOpenInputMenu] = useState(false);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const [, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector((state: RootState) => state.user.user);
  const { isConfirm, modalId } = useSelector((state: RootState) => state.modal);
  const handleSubmitCreateMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const content = inputMessage.trim();
    if (content.length === 0) return;

    if (!chatRoom) return console.error('채팅방을 찾을 수 없습니다.');
    const { error } = await supabase.from('chat_messages').insert({
      room_id: chatRoom.room_id,
      content: content,
    });
    if (error) return dispatch(displayToastAsync({ id: Date.now(), type: 'warning', message: String(error) }));

    setInputMessage('');
  };

  const handleRequestTutoring = async () => {
    if (!chatRoom || !loginUser || loginUser.role !== 'student') return;
    const tutor = chatRoom.chat_room_participants.filter((participant) => participant.user_id !== userId);
    if (tutor.length > 1) return;
    try {
      await matchingRequest({ tutorId: tutor[0].user_id, userId: userId });
      await sendStudentMessage(chatRoom.room_id, 'request');
      dispatch(displayToastAsync({ id: Date.now(), type: 'success', message: '성공적으로 튜터링을 요청했습니다.' }));
    } catch (error) {
      if (error instanceof Error) dispatch(displayToastAsync({ id: Date.now(), type: 'warning', message: error.message || String(error) }));
    }
  };

  const handleLeaveRoom = async () => {
    if (!chatRoom) return;
    dispatch(openModal({ type: 'confirm', message: '채팅방을 나가시겠습니까?', modalId: 'ChatRoom' }));
  };

  const leaveRoom = async () => {
    if (!chatRoom) return;
    try {
      await leaveChatRoom(chatRoom.room_id);
      setSearchParams((prev) => {
        prev.delete('room_id');
        return prev;
      });
    } catch (error) {
      dispatch(displayToastAsync({ id: Date.now(), type: 'warning', message: String(error) }));
    }
  };

  const handleChangeInputImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!chatRoom) return;
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    if (!(file.type === 'image/jpeg' || file.type === 'image/png')) return;

    try {
      await sendImageMessage(chatRoom.room_id, file);
    } catch (error) {
      dispatch(displayToastAsync({ id: Date.now(), type: 'warning', message: String(error) }));
    }
  };

  const handleOpenLocationModal = () => {
    if (!chatRoom) return;
    dispatch(openModal({ type: 'chatLocationModal', targetId: chatRoom.room_id }));
  };

  const handleCloseRoom = async () => {
    setSearchParams((prev) => {
      prev.delete('room_id');
      return prev;
    });
  };

  const handleOpenDetailModal = (id: string) => {
    dispatch(openModal({ type: 'chatPlayerDetailModal', targetId: id }));
  };

  useEffect(() => {
    if (isConfirm && modalId === 'ChatRoom') leaveRoom();
    return () => {
      dispatch(clearModal());
    };
  }, [isConfirm]);

  useEffect(() => {
    if (!chatAreaRef.current) return;
    chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
  }, [chatMessages]);

  const usersExcludeMe = chatRoom?.chat_room_participants.filter((participant) => participant.user_id !== userId);
  const profile = usersExcludeMe && usersExcludeMe.length > 0 ? usersExcludeMe[0].profiles : undefined;

  if (!chatRoom)
    return (
      <S.Container>
        <S.NoRoomContainer>
          <S.NoRoomText>채팅방을 선택하세요</S.NoRoomText>
        </S.NoRoomContainer>
      </S.Container>
    );

  return (
    <S.Container>
      <S.Header>
        <S.HeaderLeft>
          {isMobile && (
            <S.IconButton onClick={handleCloseRoom}>
              <IoIosArrowBack size={30} />
            </S.IconButton>
          )}
        </S.HeaderLeft>
        <S.HeaderCenter>
          {profile && (
            <>
              <S.HeaderTitle>{profile.username}</S.HeaderTitle>
              <S.IconButton onClick={() => handleOpenDetailModal(profile.id)}>
                <IoIosInformationCircleOutline size={22} />
              </S.IconButton>
            </>
          )}
        </S.HeaderCenter>
        <S.HeaderButton onClick={handleLeaveRoom} color="red">
          나가기
        </S.HeaderButton>
      </S.Header>

      <S.ChatArea ref={chatAreaRef}>
        <S.ChatList>
          {chatMessages.map((message, index) => {
            let result;
            if (index === 0 || !isSameDate(message.created_at, chatMessages[index - 1].created_at)) {
              result = (
                <S.ChatDate>
                  <S.ChatDateDivider />
                  <S.ChatDateText>{getDateTextFromISODate(message.created_at)}</S.ChatDateText>
                </S.ChatDate>
              );
            }

            return (
              <Fragment key={message.message_id}>
                {result}
                <ChatMessage message={message} isMine={message.user_id === userId} key={message.message_id} />
              </Fragment>
            );
          })}
        </S.ChatList>
      </S.ChatArea>

      <S.InputArea>
        <form onSubmit={handleSubmitCreateMessage}>
          <S.FormInner>
            <S.InputMenuButton $isOpen={isOpenInputMenu} type="button" onClick={() => setOpenInputMenu((prev) => !prev)}>
              <IoMdAdd size={29} color="#595959" />
            </S.InputMenuButton>
            <S.MessageInput type="text" value={inputMessage} placeholder="메세지를 입력해주세요." onChange={(e) => setInputMessage(e.target.value)} />
            <S.SendButton type="submit">
              <IoIosSend size={34} color={'#ffffff'} />
            </S.SendButton>
          </S.FormInner>
        </form>
        <S.InputMenu $isOpen={isOpenInputMenu}>
          <S.InputMenuInner>
            <input ref={inputImageRef} type="file" id="chat_image" name="chat_image" accept="image/png, image/jpeg" onChange={handleChangeInputImage} hidden />
            <S.InputMenuButtonItem type="button" onClick={() => inputImageRef.current?.click()}>
              <div>
                <BiImageAdd size={28} />
              </div>
              <p>이미지</p>
            </S.InputMenuButtonItem>
            <S.InputMenuButtonItem type="button" onClick={handleOpenLocationModal}>
              <div>
                <IoLocationOutline size={28} />
              </div>
              <p>위치공유</p>
            </S.InputMenuButtonItem>
            {loginUser && loginUser.role === 'student' && (
              <S.InputMenuButtonItem type="button" onClick={handleRequestTutoring}>
                <div>
                  <BsChatHeart size={28} />
                </div>
                <p>튜터링 요청</p>
              </S.InputMenuButtonItem>
            )}
          </S.InputMenuInner>
        </S.InputMenu>
      </S.InputArea>
    </S.Container>
  );
};

export default ChatRoom;
