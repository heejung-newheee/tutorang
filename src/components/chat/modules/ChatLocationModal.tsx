import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/config/configStore';
import { closeModal } from '../../../redux/modules';
import styled from 'styled-components';
import KakaoMap from './KakaoMap';
import { useState, useCallback, useEffect } from 'react';
import { LocationDataType, sendLocationMessage } from '../../../api/chat';
import { IoClose } from 'react-icons/io5';
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

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Container>
      <Inner>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p>위치 공유하기</p>
          <IconButton onClick={handleClose}>
            <IoClose size={30} />
          </IconButton>
        </div>
        <KakaoMap onChange={handleChangeLocation} />
        <LocationForm>
          <div style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '0.25rem' }}>
            <label htmlFor="location_name">위치명: </label>
            <LocationNameInput type="text" id="location_name" value={inputLocationName} onChange={handleChangeLocationName} />
          </div>
          <Button onClick={handleSendLocationMessage}>공유하기</Button>
        </LocationForm>
      </Inner>
    </Container>
  );
};

export default ChatLocationModal;

const Container = styled.div`
  position: fixed;
  z-index: 999;
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

  width: 600px;
  margin: 0 32px;
  background-color: #fff;
  border-radius: 18px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    margin: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

const LocationForm = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const LocationNameInput = styled.input`
  outline: none;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 0.25rem;
  font-size: 1rem;
  text-indent: 0.5rem;
  flex: 1;
  min-width: 0;
`;

const Button = styled.button`
  background-color: #0083f5;
  border-radius: 10px;
  padding: 0.5rem 0.875rem;
  font-size: 0.875rem;
  color: #fff;
  white-space: nowrap;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const IconButton = styled.button`
  display: flex;
  padding: 0.25rem;
  margin: 0;
  border-radius: 50%;
  &:hover,
  &:hover,
  &:focus,
  &:focus-within {
    background-color: #e7e7e7;
  }
`;
