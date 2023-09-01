import { styled } from 'styled-components';

export const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  max-width: 890px;
  margin: 0 auto;
`;

export const ReviewItem = styled.div`
  display: flex;
  gap: 10%;
  justify-content: space-between;
`;

export const ReviewItemContent = styled.div`
  /* max-width: 550px; */
  width: 60%;
`;

export const ReviewItemTitle = styled.h4`
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 17px 0;
`;

export const ReviewItemText = styled.p`
  font-size: 16px;
`;

export const ReviewItemAuthor = styled.span`
  font-size: 0.9rem;
  display: block;
  padding-top: 15px;
  color: #888;
`;
export const ReviewVideoBox = styled.div`
  height: 270px;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
`;
export const ReviewItemImage = styled.img`
  height: auto;
  max-width: 100%;
  object-fit: cover;
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
`;
export const PlayBtn = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 8px;
  cursor: pointer;
`;
