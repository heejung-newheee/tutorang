import { Tables } from '../../../../supabase/database.types'
import { ImageDataType } from '../../../../api/chat';

const ImageMessage = ({message}: {message: Tables<'chat_messages'>}) => {
  const data = message.data as ImageDataType;
  return (
    <div><img width={200} src={data['imageUrl']} style={{borderRadius:'10px',objectFit:'cover'}}/></div>
  )
}

export default ImageMessage