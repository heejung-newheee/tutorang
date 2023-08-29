import styled from 'styled-components';
import { closeModal } from '../../../redux/modules';
import { useDispatch } from 'react-redux';

const HeaderModal = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <ModalContainer onClick={handleClose}>
      <button>adasd</button>
    </ModalContainer>
  );
};

export default HeaderModal;

const ModalContainer = styled.div`
  width: 30%;
  height: 100%;
  background-color: aquamarine;
`;
