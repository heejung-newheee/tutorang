import KaKaoStaticMap from '../KaKaoStaticMap';
import { Tables } from '../../../../supabase/database.types';
import { LocationDataType } from '../../../../api/chat';
import * as S from './LocationMessage.styled';

const LocationMessage = ({ message }: { message: Tables<'chat_messages'> }) => {
  const { latitude, longitude, name } = message.data as LocationDataType;

  return (
    <S.Container>
      <KaKaoStaticMap latitude={latitude} longitude={longitude} />
      <S.InfoContainer>
        <S.Name>{name}</S.Name>
        <S.FindRouteLink href={`https://map.kakao.com/link/to/${name},${latitude},${longitude}`} target="_blank">
          길찾기
        </S.FindRouteLink>
      </S.InfoContainer>
    </S.Container>
  );
};

export default LocationMessage;
