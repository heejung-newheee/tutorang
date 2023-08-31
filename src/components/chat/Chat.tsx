import ChatContextProvider from './modules/ChatContextProvider';
import ChatRoomList from './modules/ChatRoomList';
import ChatRoom from './modules/ChatRoom';
import styled from 'styled-components';

const Chat = ({ userId }: { userId: string }) => {
  return (
    <ChatContextProvider userId={userId}>
      <Container>
        <ChatRoomList userId={userId} />
        <ChatRoom userId={userId} />
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
