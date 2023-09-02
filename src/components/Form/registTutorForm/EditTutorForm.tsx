import { useDispatch } from 'react-redux';
import { close } from '../../../assets';
import { Container, ContentWrapper, Inner } from '../reviewForm/ReviewForm.styled';
import { closeModal } from '../../../redux/modules';
import { CloseBtn, EditFormTop } from '../profileForm/ProfileForm.styled';

const EditTutorForm = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal());
  };
  return (
    <Container>
      <Inner>
        <ContentWrapper>
          <EditFormTop>
            <h2>수업 정보 수정</h2>
            <CloseBtn onClick={handleClose}>
              <img src={close} alt="close button" />
            </CloseBtn>
          </EditFormTop>
        </ContentWrapper>
      </Inner>
    </Container>
  );
};

export default EditTutorForm;
