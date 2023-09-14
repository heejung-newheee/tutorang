import { ReactNode, createContext, useRef, useState } from 'react';
import * as ReactDOM from 'react-dom';
import ToastPortal from './ToastPortal';

export const ToastContext = createContext({
  displayMessage: (options: { message: string; type: string }) => {},
});

type ToastPortalProps = {
  children: ReactNode;
};

const ToastProvider = ({ children }: ToastPortalProps) => {
  const initialState = [
    {
      message: '',
      type: '',
    },
  ];

  const [message, setMessage] = useState(initialState);

  const displayMessage = () => {
    setMessage((prev) => [...prev]);
  };

  return (
    <ToastContext.Provider value={{ displayMessage }}>
      <ToastPortal>hi</ToastPortal>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
