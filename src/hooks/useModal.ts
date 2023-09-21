import { useState } from 'react';
import { Modal, ModalProps } from '../components';

type UseModalReutnType = {
  Modal: ({ children, isOpen, closeModal }: ModalProps) => JSX.Element;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const useModal = (): UseModalReutnType => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    Modal,
    isOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
