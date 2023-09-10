import React, { Fragment, useEffect, useRef, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { IoIosArrowBack, IoIosSend, IoMdAdd, IoIosInformationCircleOutline } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { leaveChatRoom, sendImageMessage, sendTutoringMessage } from '../../../api/chat';
import { matchingRequest } from '../../../api/match';
import useChatContext from '../../../hooks/useChatContext';
import { openModal } from '../../../redux/modules';
import supabase from '../../../supabase';
import { ChatMessage } from './ChatMessage';
import * as S from './ChatRoom.styled';
import { useViewport } from '../../../hooks';

const getDateText = (isoDateString: string): string => {
  const isoDate = new Date(isoDateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat(navigator.language, options).format(isoDate);
};

const ChatRoom = ({ userId }: { userId: string }) => {
  const { isMobile } = useViewport();
  const { chatRoom, chatMessages } = useChatContext();
  const [inputMessage, setInputMessage] = useState('');
  const [isOpenInputMenu, setOpenInputMenu] = useState(false);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const [, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const handleSubmitCreateMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const content = inputMessage.trim();
    if (content.length === 0) return;

    if (!chatRoom) return console.error('채팅방을 찾을 수 없습니다.');
    const { error } = await supabase.from('chat_messages').insert({
      room_id: chatRoom.room_id,
      content: content,
    });
    if (error) return console.error(error);

    setInputMessage('');
  };

  const handleRequestTutoring = async () => {
    if (!chatRoom) return;
    const tutor = chatRoom.chat_room_participants.filter((participant) => participant.user_id !== userId);
    if (tutor.length > 1) return;
    try {
      await matchingRequest({ tutorId: tutor[0].user_id, userId: userId });
      await sendTutoringMessage(chatRoom.room_id, 'request');
      window.alert('성공적으로 튜터링을 요청했습니다.');
    } catch (error) {
      if (error instanceof Error) window.alert(error.message || error);
    }
  };

  const handleLeaveRoom = async () => {
    if (!chatRoom) return;
    const confirm = window.confirm('채팅방을 나가시겠습니까?');
    if (!confirm) return;
    try {
      await leaveChatRoom(chatRoom.room_id);
      setSearchParams((prev) => {
        prev.delete('room_id');
        return prev;
      });
    } catch (err) {
      console.error(err);
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
      console.error(error);
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
    if (!chatAreaRef.current) return;
    chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
  }, [chatMessages]);

  const usersExcludeMe = chatRoom?.chat_room_participants.filter((participant) => participant.user_id !== userId);
  const profile = usersExcludeMe && usersExcludeMe.length > 0 ? usersExcludeMe[0].profiles : undefined;

  if (!chatRoom)
    return (
      <S.Container>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
          <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#808080' }}>채팅방을 선택하세요</p>
        </div>
      </S.Container>
    );

  return (
    <S.Container>
      <S.Header>
        <div>
          {isMobile && (
            <S.IconButton onClick={handleCloseRoom}>
              <IoIosArrowBack size={30} />
            </S.IconButton>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', overflow: 'hidden' }}>
          {profile && (
            <>
              <S.HeaderTitle>{profile.username}</S.HeaderTitle>
              <S.IconButton onClick={() => handleOpenDetailModal(profile.id)}>
                <IoIosInformationCircleOutline size={22} />
              </S.IconButton>
            </>
          )}
        </div>
        <S.HeaderButton onClick={handleLeaveRoom} color="red">
          나가기
        </S.HeaderButton>
      </S.Header>

      <S.ChatArea ref={chatAreaRef}>
        <S.ChatList>
          {chatMessages.map((message, index) => {
            let result;
            const currentDateNumber = getDateText(message.created_at);

            if (index === 0 || currentDateNumber !== getDateText(chatMessages[index - 1].created_at)) {
              result = (
                <li style={{ textAlign: 'center', position: 'relative' }}>
                  <hr style={{ position: 'absolute', top: '50%', left: 0, width: '100%', margin: 0, height: '1px', border: 'none', borderTop: '1px solid #ccc' }} />
                  <span style={{ color: '#808080', zIndex: 1, position: 'relative', backgroundColor: '#ffffff', padding: '0 0.5rem' }}>{getDateText(message.created_at)}</span>
                </li>
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
            <input ref={inputImageRef} type="file" id="chat_image" name="chat_image" accept="image/png, image/jpeg" onChange={handleChangeInputImage} style={{ display: 'none' }} />
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
            <S.InputMenuButtonItem type="button" onClick={handleRequestTutoring}>
              <div>
                <IoLocationOutline size={28} />
              </div>
              <p>튜터링 요청</p>
            </S.InputMenuButtonItem>
          </S.InputMenuInner>
        </S.InputMenu>
      </S.InputArea>
    </S.Container>
  );
};

export default ChatRoom;
