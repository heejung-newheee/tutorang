import { useMemo, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BiSearchAlt2 } from 'react-icons/bi';
import useChatContext from '../../../hooks/useChatContext';
import * as S from './ChatRoomList.styled';
import { useViewport } from '../../../hooks';
import ChatRoomPreview from './ChatRoomPreview';

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
