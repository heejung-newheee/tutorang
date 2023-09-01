import { styled } from 'styled-components';
// 튜더 대시보드
// 수강생 후기
export const StudentList = styled.ul``;
export const StudentItem = styled.li`
  margin: 10px 0;
  padding: 35px;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 17px;
`;

export const StudentReview = styled.div``;
export const StReviewTitle = styled.h3`
  /* font-size: 27px; */
  font-size: 21px;
  font-weight: bold;
  margin: 0 0 20px 0;
`;

export const StReviewContent = styled.p`
  font-size: 16px;
  margin: 0 0 38px 0;
`;

export const StReviewAuth = styled.p`
  font-size: 13px;
  color: #999;
`;
export const ReviewRating = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 5px;
  img {
    width: 30px;
    filter: invert(78%) sepia(45%) saturate(4904%) hue-rotate(337deg) brightness(102%) contrast(99%);
  }
`;
