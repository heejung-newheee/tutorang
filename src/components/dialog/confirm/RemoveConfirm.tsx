import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../..';
import { reviewDelete } from '../../../api/review';
import { RootState } from '../../../redux/config/configStore';
import { closeModal } from '../../../redux/modules';
import * as S from './Confirm.styled';

const REVIEW_QUERY_KEY = 'reviewTutorDetail';

const RemoveConfirm = () => {
  const dispatch = useDispatch();
  const { targetId: _id } = useSelector((state: RootState) => state.modal);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const queryClient = useQueryClient();

  const mutationReviewDelete = useMutation(reviewDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries([REVIEW_QUERY_KEY]);
    },
  });

  const handleReviewDelete = () => {
    mutationReviewDelete.mutate(Number(_id));
    dispatch(closeModal());
  };

  return (
    <S.Container>
      <S.Inner
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
        }}
      >
        <S.ContentWrapper>
          <S.Title>정말 삭제하시겠습니까?</S.Title>
          <S.Description>삭제하실 경우 다시 되돌릴 수 없습니다.</S.Description>
        </S.ContentWrapper>

        <S.ButtonWrapper>
          <Button variant="text" color="gray" size="Large" onClick={handleClose}>
            취소
          </Button>
          <Button variant="text" color="red" size="Large" onClick={handleReviewDelete}>
            삭제
          </Button>
        </S.ButtonWrapper>
      </S.Inner>
    </S.Container>
  );
};

export default RemoveConfirm;
