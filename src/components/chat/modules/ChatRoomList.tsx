import { useSearchParams } from 'react-router-dom';
import { leaveChatRoom } from '../../../api/chat';
import useChatContext from '../../../hooks/useChatContext';
import { RoomWithLastMessageType } from '../../../supabase/database.types';
import defaultProfileImgUrl from '../../../assets/basic-user-profile-img.png';
import * as S from './ChatRoomList.styled';

const ChatRoomList = ({ userId }: { userId: string }) => {
  const { chatRoomList } = useChatContext();

  const sortedChatRoomList = chatRoomList?.sort((a, b) => {
    const a_updated_at = +new Date(a.last_message.length > 0 ? a.last_message[0].created_at : a.created_at!);
    const b_updated_at = +new Date(b.last_message.length > 0 ? b.last_message[0].created_at : b.created_at!);
    return b_updated_at - a_updated_at;
  });
  return (
    <S.Container>
      <ul>
        {sortedChatRoomList?.map((room) => (
          <ChatRoomPreview room={room} key={room.room_id} userId={userId} />
        ))}
      </ul>
    </S.Container>
  );
};

export default ChatRoomList;

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
      <S.ChatRoomPreviewLink to={`/chat2?room_id=${room.room_id}`}>
        <S.ProfileImageWrapper>
          <img src={profile?.avatar_url || defaultProfileImgUrl} alt="avatar" width={54} height={54} />
        </S.ProfileImageWrapper>
        <div>
          <div>
            <S.ProfileName>
              {room.chat_room_participants.find((participant) => participant.user_id !== userId)?.profiles.username || '참가자 없음'}
              {room.chat_room_participants.length > 2 && ' 외' + room.chat_room_participants.length + '명'}
            </S.ProfileName>
          </div>
          <S.PreviewMessage>{room.last_message.length > 0 ? room.last_message[0].content : 'No message'}</S.PreviewMessage>
        </div>
        {/* 채팅방 나가기 버튼 디자인 미정  */}
        <div style={{ display: 'none' }}>
          <button onClick={() => handleLeaveRoom(room.room_id)}>채팅방 나가기</button>
        </div>
      </S.ChatRoomPreviewLink>
    </S.ChatRoomPreviewContainer>
  );
};
