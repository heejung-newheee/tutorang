import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
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
          <Message>{message}</Message>
          <Button variant="text" color="gray" size="Large" onClick={handleClose}>
            닫기
          </Button>
        </S.Inner>
      </S.Container>
    </S.Overlay>
  );
};

export default Alert;

const Message = styled.div`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
`;
