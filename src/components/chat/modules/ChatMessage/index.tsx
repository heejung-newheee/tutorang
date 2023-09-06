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

export const ChatMessage = ({ message, isMine }: { message: Tables<'chat_messages'>; isMine: boolean }) => {
  let messageContent = <></>;

  if (!message.type) messageContent = <S.ChatTextMessageContent $isMine={isMine}>{message.content}</S.ChatTextMessageContent>;
  else if (['request', 'accept', 'reject'].includes(message.type)) {
    messageContent = <TutoringMessage message={message} />;
  } else if (message.type === 'image') {
    messageContent = <ImageMessage message={message} />;
  } else if (message.type === 'location') {
    messageContent = <LocationMessage message={message} />;
  }
  return (
    <S.ChatMessage $isMine={isMine} $isCustom={!!message.type}>
      {messageContent}
      <S.ChatMessageTime>{getTimeText(message.created_at)}</S.ChatMessageTime>
    </S.ChatMessage>
  );
};
