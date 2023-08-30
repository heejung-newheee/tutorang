import { useSelector } from 'react-redux';
import { RootState } from '../redux/config/configStore';
import Chat from '../components/chat';

const Chat2 = () => {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user) return <div>You need to log in</div>;
  return <Chat userId={user.id} />;
};

export default Chat2;
