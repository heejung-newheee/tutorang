import * as S from './ToastContainer.styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/config/configStore';
import ToastPortal from './ToastPortal';
import { removeToast } from '../../../redux/modules/ToastSlice';

const ToastContainer = () => {
  const { toasts } = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch();

  const switchIconType = (type: string) => {
    switch (type) {
      case 'success':
        return <div>success</div>;
        break;
      case 'info':
        return <div>info</div>;
        break;
      case 'warning':
        return <div>warning</div>;
        break;
      case 'danger':
        return <div>danger</div>;
        break;
    }
  };

  return (
    <ToastPortal>
      {toasts.map((toast) => {
        return (
          <S.Toast key={toast.id} className={toast.type}>
            {switchIconType(toast.type)}
            <S.Message>{toast.message}</S.Message>
            <S.ButtonClose onClick={() => dispatch(removeToast(toast.id))}>X</S.ButtonClose>
          </S.Toast>
        );
      })}
    </ToastPortal>
  );
};

export default ToastContainer;
