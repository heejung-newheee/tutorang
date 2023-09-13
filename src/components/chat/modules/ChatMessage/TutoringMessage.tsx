import { Tables } from '../../../../supabase/database.types';
import * as S from './TutoringMessage.styled';

type Props = {
  message: Tables<'chat_messages'>;
};

const TutoringMessage = ({ message }: Props) => {
  const { content } = message;

  return (
    <S.ChatCustomMessageContent $customType={message.type}>
      {content}
      <p>
        <S.ChatCustomMessageLink to={'/mypage'}>마이페이지에서 확인하기</S.ChatCustomMessageLink>
      </p>
    </S.ChatCustomMessageContent>
  );
};

export default TutoringMessage;
