import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

type ToastPortalProps = {
  children: ReactNode;
};

const ToastPortal = ({ children }: ToastPortalProps) => {
  const toastRoot = document.getElementById('toast-root') as HTMLElement;
  return ReactDOM.createPortal(children, toastRoot);
};

export default ToastPortal;
