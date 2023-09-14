import { useContext } from 'react';
import { ToastContext, ToastContextType } from '../components';

const useToast = () => {
  const displayToast = useContext<ToastContextType>(ToastContext);
  return displayToast;
};

export default useToast;
