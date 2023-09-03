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
