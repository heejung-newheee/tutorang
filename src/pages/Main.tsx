import { useModal } from '../hooks';
import { Dialog, Alert, Confirm } from '../components';

const Main = () => {
  const { Modal, isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <Confirm closeModal={closeModal} />
      </Modal>
      <button onClick={openModal}>열기</button>
    </>
  );
};

export default Main;
