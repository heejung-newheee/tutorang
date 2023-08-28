import React from 'react';
import { Container, ContentWrapper, Inner } from '../reviewForm/ReviewForm.styled';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/modules';

const EditProfileForm = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Container>
      <Inner>
        <ContentWrapper>
          <button onClick={handleClose}>닫기</button>
        </ContentWrapper>
      </Inner>
    </Container>
  );
};

export default EditProfileForm;
