import { useSearchParams } from 'react-router-dom';
import defaultProfileImgUrl from '../../../assets/basic-user-profile-img.png';
import { RoomWithLastMessageType } from '../../../supabase/database.types';
import PreviewTime from '../../time/PreviewTime';
import * as S from './ChatRoomPreview.styled';

const ChatRoomPreview = ({ room, userId }: { room: RoomWithLastMessageType; userId: string }) => {
  const [searchParams] = useSearchParams();
  const currentRoomId = searchParams.get('room_id');

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
      </S.ChatRoomPreviewLink>
    </S.ChatRoomPreviewContainer>
  );
};

export default ChatRoomPreview;
