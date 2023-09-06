import { styled } from 'styled-components';
import { colors } from '../../../style/theme/colors';
export const Descktop = styled.div`
  @media only screen and (max-width: 945px) {
    display: none;
  }
`;
export const CompleteTutor = styled.div`
  margin-right: 66px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
export const CompleteImg = styled.img`
  display: flex;
  justify-content: center;
  width: 92px;
  height: 92px;
  overflow: hidden;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
`;
export const CompleteContents = styled.div`
  text-align: center;
  > div {
    margin-top: 8px;
  }
`;
export const ComTutorName = styled.div`
  font-size: 16px;
`;
export const ComTutorLocation = styled.div`
  font-size: 13px;
`;
export const ReviewBtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;
export const ReviewBtn = styled.button`
  font-size: 14px;
  line-height: 26px;
  padding: 0 15px;
  border-radius: 20px;
  border: solid 1px #000;
  margin-top: 8px;
  transition: all 0.3s;
  &.review-btn {
    color: ${colors.primary};
  }
  &:hover {
    border: solid 1px ${colors.primary};
    background-color: ${colors.primary};
    color: #fff;
  }
`;
