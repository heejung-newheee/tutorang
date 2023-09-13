import { ReactNode } from 'react';
import ReactDom from 'react-dom';

type ModalPortalProps = {
  children: ReactNode;
};

const ModalPortal = ({ children }: ModalPortalProps) => {
  const modalRoot = document.getElementById('modal-root') as HTMLElement;
  return ReactDom.createPortal(children, modalRoot);
};

export default ModalPortal;
