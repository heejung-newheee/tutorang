import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { colors } from '../../../style/theme/colors';

export const TutorClassWarp = styled.div`
  background-color: #fff;
  padding: 37px 50px;
  border-radius: 8px;
  @media only screen and (max-width: 768px) {
    padding: 37px 30px;
  }
`;
export const TutorClassTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 21px;
`;
export const ClassEditBtn = styled(Link)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${colors.primary};
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 8px;
  }
`;
export const TutorClass = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  > div {
    width: calc((100% - 30px) / 2);
    @media only screen and (max-width: 768px) {
      width: 100%;
    }
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
