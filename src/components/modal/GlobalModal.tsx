import * as S from './Modal.styled';
import { Alert, Confirm, Report } from '..';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config/configStore';
import ModalPortal from './ModalPortal';

const MODAL_TYPES = {
  confirm: 'confirm',
  alert: 'alert',
  report: 'report',
};

const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.confirm,
    component: <Report />,
  },
  {
    type: MODAL_TYPES.alert,
    component: <Alert />,
  },
  {
    type: MODAL_TYPES.report,
    component: <Confirm />,
  },
];

const GlobalModal = () => {
  const { type, isOpen } = useSelector((state: RootState) => state.modal);
  if (!isOpen) return;

  const findModal = MODAL_COMPONENTS.find((modal) => {
    return modal.type === type;
  });

  const renderModal = () => {
    return findModal?.component;
  };

  return (
    <ModalPortal>
      <S.Overlay />
      {renderModal()}
    </ModalPortal>
  );
};

export default GlobalModal;
