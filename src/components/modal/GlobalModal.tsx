import { useSelector } from 'react-redux';
import { Alert, Confirm, RemoveConfirm, Report, ReviewForm, ReviewUpdateForm } from '..';
import EditTutorForm from '../../pages/auth/registTutorForm/EditTutorForm';
import YoutubeModal from '../../pages/main/youtube/YoutubeModal';
import EditProfileForm from '../../pages/mypage/profileForm/EditProfileForm';
import { RootState } from '../../redux/config/configStore';
import MatchedReviewForm from '../review/reviewForm/MatchedReviewForm';
import * as S from './Modal.styled';
import ModalPortal from './ModalPortal';
import ChatLocationModal from '../chat/modules/ChatLocationModal';

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
    matchedReviewCreate: 'matchedReviewCreate',
    editProfiles: 'editProfiles',
    editTutorInfo: 'editTutorInfo',
    reviewYoutube: 'reviewYoutube',
    chatLocationModal: 'chatLocationModal',
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
      type: MODAL_TYPES.matchedReviewCreate,
      component: <MatchedReviewForm />,
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
      type: MODAL_TYPES.reviewYoutube,
      component: <YoutubeModal />,
    },
    {
      type: MODAL_TYPES.chatLocationModal,
      component: <ChatLocationModal/>
    }
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
