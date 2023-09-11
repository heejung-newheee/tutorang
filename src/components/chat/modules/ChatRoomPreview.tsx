import { useSearchParams } from 'react-router-dom';
import useChatContext from '../../../hooks/useChatContext';
import { RoomWithLastMessageType } from '../../../supabase/database.types';
import * as S from './ChatRoomPreview.styled';
import { leaveChatRoom } from '../../../api/chat';
import defaultProfileImgUrl from '../../../assets/basic-user-profile-img.png';
import { useEffect, useState } from 'react';
import { calculateTimeDifference } from '../../../utils/Date';

const ChatRoomPreview = ({ room, userId }: { room: RoomWithLastMessageType; userId: string }) => {
  const { setChatRoom, setChatMessages } = useChatContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentRoomId = searchParams.get('room_id');

  const handleLeaveRoom = async (room_id: string) => {
    const confirm = window.confirm('채팅방을 나가시겠습니까?');
    if (!confirm) return;
    try {
      await leaveChatRoom(room_id);

      if (currentRoomId !== room_id) return;

      setChatRoom(null);
      setChatMessages([]);
      setSearchParams((prev) => {
        prev.delete('room_id');
        return prev;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const usersExcludeMe = room.chat_room_participants.filter((participant) => participant.user_id !== userId);
  const profile = usersExcludeMe.length > 0 ? usersExcludeMe[0].profiles : undefined;

  return (
    <S.ChatRoomPreviewContainer key={room.room_id} $isCurrentRoom={room.room_id === currentRoomId}>
      <S.ChatRoomPreviewLink to={`/chat?room_id=${room.room_id}`}>
        <S.ProfileImageWrapper>
          <S.ProfileImage src={profile?.avatar_url || defaultProfileImgUrl} alt="avatar" width={54} height={54} />
        </S.ProfileImageWrapper>
        <S.PreviewContent>
          <S.PreviewTitle>
            <S.ProfileName>
              {room.chat_room_participants.find((participant) => participant.user_id !== userId)?.profiles.username || '참가자 없음'}
              {room.chat_room_participants.length > 2 && ' 외' + room.chat_room_participants.length + '명'}
            </S.ProfileName>
            <S.PreviewTime>{room.last_message.length > 0 && <PreviewTime time={room.last_message[0].created_at}></PreviewTime>}</S.PreviewTime>
          </S.PreviewTitle>
          <S.PreviewMessage>{room.last_message.length > 0 ? room.last_message[0].content : 'No message'}</S.PreviewMessage>
        </S.PreviewContent>
        <div style={{ display: 'none' }}>
          <button onClick={() => handleLeaveRoom(room.room_id)}>채팅방 나가기</button>
        </div>
      </S.ChatRoomPreviewLink>
    </S.ChatRoomPreviewContainer>
  );
};

export default ChatRoomPreview;

const PreviewTime = ({ time }: { time: string }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const newTimeAgo = calculateTimeDifference(time);
      setTimeAgo(newTimeAgo);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  return <>{timeAgo}</>;
};
