import { useContext } from 'react';
import { ChatContext } from '../components/chat/modules/ChatContextProvider';

const useChatContext = () => {
  return useContext(ChatContext);
};

export default useChatContext;
