import { styled } from 'styled-components';

export const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const ReviewItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ReviewItemContent = styled.div`
  max-width: 550px;
`;

export const ReviewItemTitle = styled.h4`
  font-size: 2.5rem;
  font-weight: 700;
`;

export const ReviewItemText = styled.p`
  font-size: 1.25rem;
`;

export const ReviewItemAuthor = styled.span`
  font-size: 1.375rem;
`;
export const ReviewVideoBox = styled.div`
  height: 360px;
  overflow: hidden;
`;
export const ReviewItemImage = styled.img`
  height: auto;
  max-width: 100%;
  object-fit: cover;
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
`;
