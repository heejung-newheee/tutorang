import { ReactNode } from 'react';
import ReactDom from 'react-dom';

type ToastPortalProps = {
  children: ReactNode;
};

const ToastPortal = ({ children }: ToastPortalProps) => {
  const toastRoot = document.getElementById('toast-root') as HTMLElement;
  return ReactDom.createPortal(children, toastRoot);
};

export default ToastPortal;
