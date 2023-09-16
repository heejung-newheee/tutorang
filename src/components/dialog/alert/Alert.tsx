import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/config/configStore';
import { closeModal } from '../../../redux/modules';
import { Button } from '../../button/Button.styled';
import * as S from './Alert.styled';

const Alert = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state: RootState) => state.modal);

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <S.Overlay>
      <S.Container>
        <S.Inner
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
          }}
        >
          <S.Message>{message}</S.Message>
          <Button variant="text" color="gray" size="Large" onClick={handleClose}>
            닫기
          </Button>
        </S.Inner>
      </S.Container>
    </S.Overlay>
  );
};

export default Alert;
