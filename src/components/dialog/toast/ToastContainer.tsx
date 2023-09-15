import * as S from './ToastContainer.styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/config/configStore';
import ToastPortal from './ToastPortal';
import { removeToast } from '../../../redux/modules/ToastSlice';
import { AiFillAlert, AiFillCheckCircle, AiFillExclamationCircle, AiFillInfoCircle, AiOutlineClose } from 'react-icons/ai';

const ToastContainer = () => {
  const { toasts } = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch();

  const switchIconType = (type: string) => {
    switch (type) {
      case 'success':
        return <AiFillCheckCircle size="28px" color="green" />;
        break;
      case 'info':
        return <AiFillInfoCircle size="28px" color="blue" />;
        break;
      case 'warning':
        return <AiFillExclamationCircle size="28px" color="orange" />;
        break;
      case 'danger':
        return <AiFillAlert size="28px" color="red" />;
        break;
    }
  };

  return (
    <ToastPortal>
      <S.ToastLayout>
        {toasts.map((toast) => {
          return (
            <S.Toast key={toast.id} className={toast.type}>
              <S.Message>
                {switchIconType(toast.type)}
                {toast.message}
              </S.Message>
              <S.ButtonClose onClick={() => dispatch(removeToast(toast.id))}>
                <AiOutlineClose size="18px" />
              </S.ButtonClose>
            </S.Toast>
          );
        })}
      </S.ToastLayout>
    </ToastPortal>
  );
};

export default ToastContainer;
