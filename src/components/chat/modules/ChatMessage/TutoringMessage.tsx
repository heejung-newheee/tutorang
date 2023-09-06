import { Tables } from '../../../../supabase/database.types'
import * as S from './TutoringMessage.styled'

const TutoringMessage = ({message}:{message: Tables<'chat_messages'>}) => {
  return (
    <S.ChatCustomMessageContent $customType={message.type}>
    {message.content}
    <p>
      <S.ChatCustomMessageLink to={'/mypage'}>마이페이지에서 확인하기</S.ChatCustomMessageLink>
    </p>
  </S.ChatCustomMessageContent>
  )
}

export default TutoringMessage