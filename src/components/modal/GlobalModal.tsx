import { useSelector } from 'react-redux';
import { Alert, Confirm, RemoveConfirm, Report, ReviewForm, ReviewUpdateForm } from '..';
import RetrievePendingTutorRegistration from '../../pages/auth/registTutorForm/RetrievePendingTutorRegistration';
import YoutubeModal from '../../pages/main/youtube/YoutubeModal';
import { RootState } from '../../redux/config/configStore';
import ChatLocationModal from '../chat/modules/ChatLocationModal';
import MatchedReviewForm from '../review/reviewForm/MatchedReviewForm';
import * as S from './Modal.styled';
import ModalPortal from './ModalPortal';

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
    reviewYoutube: 'reviewYoutube',
    retrievePendingTutorRegistForm: 'retrievePendingTutorRegistForm',
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
      type: MODAL_TYPES.reviewYoutube,
      component: <YoutubeModal />,
    },
    {
      type: MODAL_TYPES.retrievePendingTutorRegistForm,
      component: <RetrievePendingTutorRegistration />,
    },
    {
      type: MODAL_TYPES.chatLocationModal,
      component: <ChatLocationModal />,
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
