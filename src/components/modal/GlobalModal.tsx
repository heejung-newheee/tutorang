import * as S from './Modal.styled';
import { Alert, Confirm, RemoveConfirm, Report, ReviewForm, ReviewUpdateForm } from '..';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config/configStore';
import ModalPortal from './ModalPortal';
import HeaderModal from '../common/header/HeaderModal';
import EditProfileForm from '../Form/profileForm/EditProfileForm';
import YoutubeModal from '../youtube/YoutubeModal';
import EditTutorForm from '../Form/registTutorForm/EditTutorForm';

const GlobalModal = () => {
  const { type, isOpen } = useSelector((state: RootState) => state.modal);
  if (!isOpen) return;

  const MODAL_TYPES = {
    confirm: 'confirm',
    confirmRemove: 'confirmRemove',
    alert: 'alert',
    report: 'report',
    reviewCreate: 'reviewCreate',
    reviewUpdate: 'reviewUpdate',
    navbabr: 'navbabr',
    editProfiles: 'editProfiles',
    editTutorInfo: 'editTutorInfo',
    reviewYoutube: 'reviewYoutube',
  };

  const MODAL_COMPONENTS = [
    {
      type: MODAL_TYPES.confirm,
      component: <Confirm />,
    },
    {
      type: MODAL_TYPES.confirmRemove,
      component: <RemoveConfirm />,
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
      type: MODAL_TYPES.editTutorInfo,
      component: <EditTutorForm />,
    },
    {
      type: MODAL_TYPES.navbabr,
      component: <HeaderModal />,
    },
    {
      type: MODAL_TYPES.reviewYoutube,
      component: <YoutubeModal />,
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
