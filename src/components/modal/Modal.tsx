import * as S from './Modal.styled';
import { ReactNode, useEffect } from 'react';
import ModalPortal from './ModalPortal';

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  closeModal: () => void;
};

const Modal = ({ children, isOpen, closeModal }: ModalProps) => {
  // 모달 오픈 시 스크롤 방지
  useEffect(() => {
    isOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
  }, [isOpen]);

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    // scrim 영역 클릭시 모달 닫히는 걸 원하지 않으실 경우 closModal()을 삭제해주세요.
    closeModal();
  };

  return <ModalPortal>{isOpen ? <S.Overlay onClick={handleClose}>{children}</S.Overlay> : null}</ModalPortal>;
};

export default Modal;
