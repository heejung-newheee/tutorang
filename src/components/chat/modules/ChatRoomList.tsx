import { useMemo, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BiSearchAlt2 } from 'react-icons/bi';
import useChatContext from '../../../hooks/useChatContext';
import * as S from './ChatRoomList.styled';
import ChatRoomPreview from './ChatRoomPreview';
import { useViewport } from '../../../hooks';

type Props = {
  userId: string;
};

const ChatRoomList = ({ userId }: Props) => {
  const [searchInput, setSearchInput] = useState('');
  const { chatRoomList } = useChatContext();
  const { isMobile } = useViewport();

  const handleClearSearchInput = () => setSearchInput('');

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value);

  const filteredChatRoomList = useMemo(() => {
    if (!searchInput) return chatRoomList;
    const trimmedText = searchInput.trim();
    return chatRoomList.filter((chatRoom) => {
      const usersExcludeMe = chatRoom.chat_room_participants.filter((participant) => participant.user_id !== userId);
      return usersExcludeMe.length > 0 && usersExcludeMe[0].profiles.username?.includes(trimmedText);
    });
  }, [chatRoomList, searchInput, userId]);

  const sortedChatRoomList = useMemo(() => {
    return filteredChatRoomList?.sort((a, b) => {
      const aUpdatedAt = +new Date(a.last_message.length > 0 ? a.last_message[0].created_at : a.created_at!);
      const bUpdatedAt = +new Date(b.last_message.length > 0 ? b.last_message[0].created_at : b.created_at!);
      return bUpdatedAt - aUpdatedAt;
    });
  }, [filteredChatRoomList]);

  return (
    <S.Container $isMobile={isMobile}>
      <S.SearchBar>
        <S.SearchBarIcon htmlFor="chat_room_search">
          <BiSearchAlt2 color="#C9C9C9" />
        </S.SearchBarIcon>
        <S.SearchInput id="chat_room_search" type="text" value={searchInput} onChange={handleChangeSearchInput} placeholder="이름으로 검색하세요." />
        {searchInput && (
          <S.SearchClearButton onClick={handleClearSearchInput}>
            <AiFillCloseCircle size={16} color="#aaaaaadc" />
          </S.SearchClearButton>
        )}
      </S.SearchBar>
      <S.ChatRoomListContainer>
        <ul>
          {sortedChatRoomList?.map((room) => (
            <ChatRoomPreview room={room} key={room.room_id} userId={userId} />
          ))}
        </ul>
      </S.ChatRoomListContainer>
    </S.Container>
  );
};

export default ChatRoomList;
