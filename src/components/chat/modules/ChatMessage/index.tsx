import { Tables } from '../../../../supabase/database.types';
import * as S from './ChatMessages.style';
import ImageMessage from './ImageMessage';
import LocationMessage from './LocationMessage';
import TutoringMessage from './TutoringMessage';

const getTimeText = (isoDateString: string) => {
  const isoDate = new Date(isoDateString);
  const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
  return new Intl.DateTimeFormat(navigator.language, options).format(isoDate);
};

type ChatMessageProps = {
  message: Tables<'chat_messages'>;
  isMine: boolean;
};

const ChatMessage = ({ message, isMine }: ChatMessageProps) => {
  let messageContent;

  switch (message.type) {
    case 'request':
    case 'pending':
    case 'accept':
    case 'reject':
      messageContent = <TutoringMessage message={message} />;
      break;
    case 'image':
      messageContent = <ImageMessage message={message} />;
      break;
    case 'location':
      messageContent = <LocationMessage message={message} />;
      break;
    default:
      messageContent = <S.ChatTextMessageContent $isMine={isMine}>{message.content}</S.ChatTextMessageContent>;
  }

  return (
    <S.ChatMessage $isMine={isMine} $isCustom={!!message.type}>
      {messageContent}
      <S.ChatMessageTime>{getTimeText(message.created_at)}</S.ChatMessageTime>
    </S.ChatMessage>
  );
};

export default ChatMessage;
