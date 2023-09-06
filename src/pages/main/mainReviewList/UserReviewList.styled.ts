import { styled } from 'styled-components';

export const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 0 auto;
  max-width: 890px;
`;

export const ReviewItem = styled.div`
  display: flex;
  gap: 10%;
  justify-content: space-between;
  @media screen and (max-width: 960px) {
    flex-wrap: wrap;
  }
`;

export const ReviewItemContent = styled.div`
  width: 60%;
  @media screen and (max-width: 960px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

export const ReviewItemTitle = styled.h4`
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 17px 0;
  @media screen and (max-width: 1024px) {
    font-size: 20px;
  }
`;

export const ReviewItemText = styled.p`
  font-size: 16px;
  @media screen and (max-width: 1024px) {
    font-size: 14px;
  }
`;

export const ReviewItemAuthor = styled.span`
  font-size: 0.9rem;
  display: block;
  padding-top: 15px;
  color: #888;
  @media screen and (max-width: 1024px) {
    font-size: 13px;
  }
`;
export const ReviewVideoBox = styled.div`
  height: 270px;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
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
