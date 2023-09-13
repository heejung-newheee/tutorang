import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/config/configStore';
import { closeModal } from '../../../redux/modules';
import KakaoMap from './KakaoMap';
import { useState, useCallback, useEffect } from 'react';
import { LocationDataType, sendLocationMessage } from '../../../api/chat';
import { IoClose, IoLocationOutline } from 'react-icons/io5';
import * as S from './ChatLocationModal.styled';

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
    <S.Container>
      <S.Inner>
        <S.Header>
          <S.HeaderTitle>
            <IoLocationOutline size={20} />
            위치 공유하기
          </S.HeaderTitle>
          <S.IconButton onClick={handleClose}>
            <IoClose size={30} />
          </S.IconButton>
        </S.Header>
        <KakaoMap onChange={handleChangeLocation} />
        <S.LocationForm>
          <S.LocationNameWrapper>
            <label htmlFor="location_name" className="sr-only">
              위치명:
            </label>
            <S.LocationNameInput type="text" id="location_name" value={inputLocationName} onChange={handleChangeLocationName} placeholder="보여질 위치이름입니다." />{' '}
          </S.LocationNameWrapper>
          <S.Button onClick={handleSendLocationMessage}>공유하기</S.Button>
        </S.LocationForm>
      </S.Inner>
    </S.Container>
  );
};

export default ChatLocationModal;
