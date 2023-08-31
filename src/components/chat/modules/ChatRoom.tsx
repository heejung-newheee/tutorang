import React, { useState, useRef, useEffect } from 'react';
import supabase from '../../../supabase';
import useChatContext from '../../../hooks/useChatContext';
import { IoIosSend } from 'react-icons/io';
import * as S from './ChatRoom.styled';
import { leaveChatRoom, sendTutoringMessage } from '../../../api/chat';
import { matchingRequest } from '../../../api/match';
import { Tables } from '../../../supabase/database.types';
import { useSearchParams } from 'react-router-dom';

const isTutoringMessage = (type: string) => {
  return ['request', 'accept', 'reject'].includes(type);
};

const getTimeString = (isoDateString: string) => {
  const isoDate = new Date(isoDateString);
  const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: false };
  const localTime = new Intl.DateTimeFormat(navigator.language, options).format(isoDate);
  return localTime;
};

const ChatRoom = ({ userId }: { userId: string }) => {
  const { chatRoom, chatMessages } = useChatContext();
  const [inputMessage, setInputMessage] = useState('');
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const [, setSearchParams] = useSearchParams();

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
    if (tutor.length > 1) return; // 임시
    try {
      await matchingRequest({ tutorId: tutor[0].user_id, userId: userId });
      await sendTutoringMessage(chatRoom.room_id, 'request');
    } catch (error) {
      if (error instanceof Error) window.alert(error.message || error);
    }
    window.alert('성공적으로 튜터링을 요청했습니다.');
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
        <S.HeaderButton onClick={handleLeaveRoom} color="red">
          채팅방 나가기
        </S.HeaderButton>
        <S.HeaderTitle>{profile?.username}</S.HeaderTitle>
        <S.HeaderButton onClick={handleRequestTutoring} color="blue">
          1:1 매칭하기
        </S.HeaderButton>
      </S.Header>

      <S.ChatArea ref={chatAreaRef}>
        <S.ChatList>
          {chatMessages.map((message) => (
            <ChatMessage message={message} isMine={message.user_id === userId} key={message.message_id} />
          ))}
        </S.ChatList>
      </S.ChatArea>

      <S.InputArea>
        <form onSubmit={handleSubmitCreateMessage}>
          <S.FormInner>
            <S.MessageInput type="text" value={inputMessage} placeholder="메세지를 입력해주세요." onChange={(e) => setInputMessage(e.target.value)} />
            <S.SendButton type="submit">
              <IoIosSend size={34} color={'#ffffff'} />
            </S.SendButton>
          </S.FormInner>
        </form>
      </S.InputArea>
    </S.Container>
  );
};

export default ChatRoom;

export const ChatMessage = ({ message, isMine }: { message: Tables<'chat_messages'>; isMine: boolean }) => {
  return (
    <S.ChatMessage $isMine={isMine} $isCustom={!!message.type}>
      {isTutoringMessage(message.type) ? (
        <S.ChatCustomMessageContent $customType={message.type}>
          {message.content}
          <p>
            <S.ChatCustomMessageLink to={'/mypage'}>마이페이지에서 확인하기</S.ChatCustomMessageLink>
          </p>
        </S.ChatCustomMessageContent>
      ) : (
        <S.ChatTextMessageContent $isMine={isMine}>{message.content}</S.ChatTextMessageContent>
      )}
      <S.ChatMessageTime>{getTimeString(message.created_at)}</S.ChatMessageTime>
    </S.ChatMessage>
  );
};
