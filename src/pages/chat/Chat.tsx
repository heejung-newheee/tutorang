import { useDispatch, useSelector } from 'react-redux';
import Chat from '../../components/chat';
import { RootState } from '../../redux/config/configStore';
import { useEffect } from 'react';
import { closeModal } from '../../redux/modules';

const Chat2 = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(closeModal());
    };
  }, []);

  const user = useSelector((state: RootState) => state.user.user);

  if (!user) return <div>You need to log in</div>;
  return <Chat userId={user.id} />;
};

export default Chat2;
