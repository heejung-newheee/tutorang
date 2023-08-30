import React, { useState } from 'react';
import supabase from '../../../supabase';
import useChatContext from '../../../hooks/useChatContext';
import { IoIosSend } from 'react-icons/io';
import * as S from './ChatRoom.styled';
import { sendTutoringMessage } from '../../../api/chat';
import { matchingRequest } from '../../../api/match';

const ChatRoom = ({ userId }: { userId: string }) => {
  const { chatRoom, chatMessages } = useChatContext();
  const [inputMessage, setInputMessage] = useState('');

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

  const usersExcludeMe = chatRoom?.chat_room_participants.filter((participant) => participant.user_id !== userId);
  const profile = usersExcludeMe && usersExcludeMe.length > 0 ? usersExcludeMe[0].profiles : undefined;

  if (!chatRoom)
    return (
      <S.Container>
        <h4>Select a chat room to start chatting</h4>
      </S.Container>
    );

  return (
    <S.Container>
      <S.Header>
        <div></div>
        <S.HeaderTitle>{profile?.username}</S.HeaderTitle>
        <S.HeaderButton onClick={handleRequestTutoring}>1:1 매칭하기</S.HeaderButton>
      </S.Header>

      <S.ChatArea>
        {chatMessages.map((message) => (
          <S.ChatMessage $isMine={message.user_id === userId}>
            <S.ChatTextMessageContent key={message.message_id} $isMine={message.user_id === userId}>
              <span>{message.content}</span>
            </S.ChatTextMessageContent>
          </S.ChatMessage>
        ))}
      </S.ChatArea>

      <S.InputArea>
        <form onSubmit={handleSubmitCreateMessage}>
          <S.FormInner>
            <S.MessageInput type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
            <S.SendButton type="submit">
              <IoIosSend size={36} color={'#ffffff'} />
            </S.SendButton>
          </S.FormInner>
        </form>
      </S.InputArea>
    </S.Container>
  );
};

export default ChatRoom;
