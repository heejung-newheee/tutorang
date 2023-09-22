import { ReactNode, useRef } from 'react';
import styled from 'styled-components';
import useClickOutside from '../../hooks/useClickOutSide';
type PageProps = {
  onClose: () => void;
  children: ReactNode;
};
const BaseModal = ({ children, onClose }: PageProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(modalRef, () => onClose());
  return (
    <>
      <ModalBackground />
      <ModalWrapper ref={modalRef}>{children}</ModalWrapper>
    </>
  );
};

export default BaseModal;

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalWrapper = styled.div`
  width: 80%;
  max-width: 424px;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
`;
