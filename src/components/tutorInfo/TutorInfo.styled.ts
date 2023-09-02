import { styled } from 'styled-components';
import { colors } from '../../style/theme/colors';
// 튜더 대시보드
export const TutorClassWarp = styled.div`
  background-color: #fff;
  padding: 37px 50px;
  border-radius: 8px;
`;
export const TutorClassTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 21px;
`;
export const ClassEditBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${colors.primary};
  img {
  }
`;
export const TutorClass = styled.div`
  display: flex;
  gap: 30px;
  > div {
    width: calc((100% - 30px) / 2);
  }
  .class-price {
    max-width: 325px;
    margin-top: 30px;
  }
`;
export const ClassDetail = styled.div``;
export const langLevel = styled.span`
  display: flex;
  justify-content: center;
  background-color: ${colors.gray_200};
  /* width: 22px; */
  padding: 2px 8px;
  border-radius: 30px;
  margin-left: 6px;
`;
export const ClassIntro = styled.div`
  p {
    font-size: 13px;
    color: #434343;
    margin-bottom: 10px;
  }
`;

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

// 글목록 불러오기 공통적용스타일
export const ContentsDataBox = styled.div`
  max-height: 600px;
  overflow-y: scroll;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 0px -10px 0px inset, rgba(0, 0, 0, 0.3) 0px 0px -18px 0px inset;
`;
export const DataTitle = styled.h3`
  /* font-size: 27px; */
  font-size: 21px;
  font-weight: bold;
  margin: 0 0 20px 0;
`;

export const DataContent = styled.p`
  font-size: 16px;
  margin: 0 0 25px 0;
`;

export const DataAuth = styled.p`
  font-size: 13px;
  color: #999;
`;
export const DataStar = styled.div`
  img {
    width: 16px;
    filter: invert(48%) sepia(0%) saturate(2647%) hue-rotate(312deg) brightness(93%) contrast(76%);
  }
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
