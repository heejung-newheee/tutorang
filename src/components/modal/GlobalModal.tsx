import * as S from './Modal.styled';
import { Alert, Confirm, Report, ReviewForm, ReviewUpdateForm } from '..';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config/configStore';
import ModalPortal from './ModalPortal';
import HeaderModal from '../common/header/HeaderModal';
import EditProfileForm from '../Form/profileForm/EditProfileForm';

const GlobalModal = () => {
  const { type, isOpen } = useSelector((state: RootState) => state.modal);
  if (!isOpen) return;

  const MODAL_TYPES = {
    confirm: 'confirm',
    alert: 'alert',
    report: 'report',
    reviewCreate: 'reviewCreate',
    reviewUpdate: 'reviewUpdate',
    navbabr: 'navbabr',
    editProfiles: 'editProfiles',
  };

  const MODAL_COMPONENTS = [
    {
      type: MODAL_TYPES.confirm,
      component: <Confirm />,
    },
    {
      type: MODAL_TYPES.alert,
      component: <Alert />,
    },
    {
      type: MODAL_TYPES.report,
      component: <Report />,
    },
    {
      type: MODAL_TYPES.reviewCreate,
      component: <ReviewForm />,
    },
    {
      type: MODAL_TYPES.reviewUpdate,
      component: <ReviewUpdateForm />,
    },
    {
      type: MODAL_TYPES.editProfiles,
      component: <EditProfileForm />,
    },
    {
      type: MODAL_TYPES.navbabr,
      component: <HeaderModal />,
    },
  ];

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
