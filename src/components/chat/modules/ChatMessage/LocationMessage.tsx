import KaKaoStaticMap from '../KaKaoStaticMap';
import { Tables } from '../../../../supabase/database.types';
import { LocationDataType } from '../../../../api/chat';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LocationMessage = ({ message }: { message: Tables<'chat_messages'> }) => {
  const data = message.data as LocationDataType;

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden', width: '200px' }}>
      <KaKaoStaticMap latitude={data.latitude} longitude={data.longitude} />
      <div style={{ padding: '10px' }}>
        <p style={{}}>{data.name}</p>
        <FindRouteLink to={`https://map.kakao.com/link/to/${data.name},${data.latitude},${data.longitude}`}>길찾기</FindRouteLink>
      </div>
    </div>
  );
};

export default LocationMessage;

const FindRouteLink = styled(Link)`
  display: inline-block;
  width: 100%;
  text-align: center;
  border-radius: 10px;
  margin-top: 10px;
  font-size: 1rem;
  padding: 10px;
  background-color: rgb(238, 238, 238);
`;
