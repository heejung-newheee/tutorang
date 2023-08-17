import { useModal } from '../hooks';
import { Dialog } from '../components';

const Main = () => {
  const { Modal, isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <Dialog closeModal={closeModal} />
      </Modal>
      <button onClick={openModal}>열기</button>
    </>
  );
};

export default Main;
