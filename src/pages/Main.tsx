import { useModal } from '../hooks';
import { Alert, Confirm } from '../components';

const Main = () => {
  const { Modal, isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <Alert closeModal={closeModal} />
      </Modal>
      <button onClick={openModal}>열기</button>
    </>
  );
};

export default Main;
