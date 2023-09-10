import { useEffect, useMemo, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useSearchParams } from 'react-router-dom';
import { leaveChatRoom } from '../../../api/chat';
import defaultProfileImgUrl from '../../../assets/basic-user-profile-img.png';
import useChatContext from '../../../hooks/useChatContext';
import { RoomWithLastMessageType } from '../../../supabase/database.types';
import * as S from './ChatRoomList.styled';
import { useViewport } from '../../../hooks';

const calculateTimeDifference = (inputTime: string): string => {
  const inputDate = new Date(inputTime);
  const currentTime = new Date();

  const timeDifference = currentTime.getTime() - inputDate.getTime();
  const timeDifferenceInMinutes = Math.floor(timeDifference / (1000 * 60));

  if (timeDifferenceInMinutes < 1) {
    return '방금 전';
  } else if (timeDifferenceInMinutes < 60) {
    return `${timeDifferenceInMinutes}분 전`;
  } else if (timeDifferenceInMinutes < 1440) {
    const hours = Math.floor(timeDifferenceInMinutes / 60);
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(timeDifferenceInMinutes / 1440);
    return `${days}일 전`;
  }
};

const ChatRoomList = ({ userId }: { userId: string }) => {
  const [searchInput, setSearchInput] = useState('');
  const { chatRoomList } = useChatContext();
  const { isMobile } = useViewport();

  const handleClearSearchInput = () => {
    setSearchInput('');
  };

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const filterdChatRoomList = useMemo(() => {
    if (!searchInput) return chatRoomList;
    const trimmedText = searchInput.trim();
    return chatRoomList.filter((chatRoom) => {
      const usersExcludeMe = chatRoom.chat_room_participants.filter((participant) => participant.user_id !== userId);
      if (usersExcludeMe.length === 0) return false;
      if (!usersExcludeMe[0].profiles.username) return false;
      return usersExcludeMe[0].profiles.username.search(trimmedText) > -1;
    });
  }, [chatRoomList, searchInput, userId]);

  const sortedChatRoomList = filterdChatRoomList?.sort((a, b) => {
    const a_updated_at = +new Date(a.last_message.length > 0 ? a.last_message[0].created_at : a.created_at!);
    const b_updated_at = +new Date(b.last_message.length > 0 ? b.last_message[0].created_at : b.created_at!);
    return b_updated_at - a_updated_at;
  });

  return (
    <S.Container $isMobile={isMobile}>
      <S.SearchBar>
        <S.SearchBarIcon htmlFor="chat_room_search">
          <BiSearchAlt2 color="#C9C9C9" />
        </S.SearchBarIcon>
        <S.SearchInput id="chat_room_search" type="text" value={searchInput} onChange={handleChangeSearchInput} placeholder="이름으로 검색하세요." />
        {searchInput && (
          <S.SearchClearButton onClick={() => handleClearSearchInput()}>
            <AiFillCloseCircle size={16} color="#aaaaaadc" />
          </S.SearchClearButton>
        )}
      </S.SearchBar>
      <div style={{ overflowY: 'auto' }}>
        <ul>
          {sortedChatRoomList?.map((room) => (
            <ChatRoomPreview room={room} key={room.room_id} userId={userId} />
          ))}
        </ul>
      </div>
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
