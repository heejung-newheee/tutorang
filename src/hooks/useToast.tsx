import { useContext } from 'react';
import { ToastContext } from '../components';

type ToastContextType = {
  displayMessage: (options: { message: string; type: string }) => void;
};

const useToast = (): ((options: { message: string; type: string }) => void) => {
  const { displayMessage } = useContext<ToastContextType>(ToastContext);

  return displayMessage;
};

export default useToast;
