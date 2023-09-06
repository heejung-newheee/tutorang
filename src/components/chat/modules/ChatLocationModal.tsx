import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/config/configStore';
import { closeModal } from '../../../redux/modules';
import styled, { css } from 'styled-components';
import KakaoMap from './KakaoMap';
import { useState, useCallback } from 'react';
import { LocationDataType, sendLocationMessage } from '../../../api/chat';

export const ChatLocationModal = () => {
  const dispatch = useDispatch();
  const { targetId } = useSelector((state: RootState) => state.modal);
  const [location, setLocation] = useState<LocationDataType | null>(null);
  const [inputLocationName, setInputLocationName] = useState('');
  const room_id = targetId as string;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleChangeLocation = useCallback((place: LocationDataType) => {
    setLocation((prev) => {
      return prev === place ? prev : place;
    });
    setInputLocationName((prev) => {
      return prev === place.name ? prev : place.name;
    });
  }, []);

  const handleSendLocationMessage = async () => {
    if (!location || !room_id) return;
    try {
      sendLocationMessage(room_id, { ...location, name: inputLocationName });
      dispatch(closeModal());
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeLocationName = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLocationName(e.target.value);
  };

  return (
    <Container>
      <Inner>
        <KakaoMap onChange={handleChangeLocation} />
        <LocationForm>
          <div>
            <label htmlFor="location_name">위치 이름: </label>
            <LocationNameInput type="text" id="location_name" value={inputLocationName} onChange={handleChangeLocationName} />
          </div>
          <ButtonWrapper>
            <Button onClick={handleSendLocationMessage}>공유하기</Button>
            <Button $type="outline" onClick={handleClose}>
              닫기
            </Button>
          </ButtonWrapper>
        </LocationForm>
      </Inner>
    </Container>
  );
};

export default ChatLocationModal;

const Container = styled.div`
  position: fixed;
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Inner = styled.div`
  position: relative;
  z-index: 999;
  width: 100%;
  max-width: 600px;
  margin: 0 32px;
  background-color: #fff;
  border-radius: 18px;
  padding: 20px;
`;

const LocationForm = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
`;

const LocationNameInput = styled.input`
  outline: none;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 0.25rem;
  font-size: 1rem;
  text-indent: 0.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button<{ $type?: 'outline' | 'fill' }>`
  background-color: #0083f5;
  border-radius: 10px;
  padding: 0.5rem 0.875rem;
  font-size: 0.875rem;
  color: #fff;

  ${({ $type }) =>
    $type === 'outline' &&
    css`
      border: 1px solid #0083f5;
      background-color: #fff;
      color: #000;
    `}
`;
