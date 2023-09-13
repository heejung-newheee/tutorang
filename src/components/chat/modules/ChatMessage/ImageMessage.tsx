import { Tables } from '../../../../supabase/database.types';
import { ImageDataType } from '../../../../api/chat';
import * as S from './ImageMessages.styled';

type Props = {
  message: Tables<'chat_messages'>;
};

const ImageMessage = ({ message }: Props) => {
  const { imageUrl } = message.data as ImageDataType;

  return (
    <div>
      <S.ImageMessages src={imageUrl} alt="message image" width={200} />
    </div>
  );
};

export default ImageMessage;
