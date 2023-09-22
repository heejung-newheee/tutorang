import { useContext, useId } from 'react';
import { GlobalModalContext } from '../context/GlobalModalContext';

export type ModalElement = ({ close }: { close: () => void }) => React.ReactNode;

const useModal = () => {
  const { addModal, removeModal } = useContext(GlobalModalContext);
  const modalId = useId();

  const open = (ModalComponent: ModalElement) => {
    setTimeout(() => {
      addModal({ id: modalId, modal: ModalComponent({ close: () => removeModal({ id: modalId }) }) });
    }, 0);
  };

  const close = () => {
    removeModal({ id: modalId });
  };

  return {
    open,
    close,
  };
};

export default useModal;
