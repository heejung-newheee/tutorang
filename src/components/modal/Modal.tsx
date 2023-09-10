import { ReactNode } from 'react';
import * as S from './Modal.styled';
import ModalPortal from './ModalPortal';

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  closeModal: () => void;
};

const Modal = ({ children, isOpen, closeModal }: ModalProps) => {
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    closeModal();
  };

  return <ModalPortal>{isOpen ? <S.Overlay onClick={handleClose}>{children}</S.Overlay> : null}</ModalPortal>;
};

export default Modal;
