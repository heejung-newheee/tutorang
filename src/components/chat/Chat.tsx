import ChatContextProvider from './modules/ChatContextProvider';
import ChatRoomList from './modules/ChatRoomList';
import ChatRoom from './modules/ChatRoom';
import styled from 'styled-components';
import { useViewport } from '../../hooks';
import { useSearchParams } from 'react-router-dom';

const Chat = ({ userId }: { userId: string }) => {
  const { isMobile } = useViewport();
  const [searchParams] = useSearchParams();
  const room_id = searchParams.get('room_id');

  return (
    <ChatContextProvider userId={userId}>
      <Container>
        {!(isMobile && !!room_id) ? (
          <ChatRoomList userId={userId}/>
        ) : null}
        {!(isMobile && !room_id) ? (
          <ChatRoom userId={userId}/>
        ): null}
      </Container>
    </ChatContextProvider>
  );
};

export default Chat;

const Container = styled.div`
  display: flex;
  height: 800px;
  border: 1px solid #eaeaea;
  border-top: 0px;
`;
