import { Tab, TabList } from 'react-tabs';
import { styled } from 'styled-components';
import { colors } from '../../../style/theme/colors';

export const TabListButton = styled(TabList)`
  display: flex;
`;
export const TabTitle = styled(Tab)`
  color: red;
`;
export const InfoList = styled.ul``;
export const InfoItem = styled.li`
  display: flex;
  text-align: center;
  height: 99px;
  align-items: center;
  border-top: solid 1px #dbd9d8;
  > div {
    width: 25%;
  }
`;
export const TutorChatLink = styled.button`
  width: 50%;
  display: inline-block;
  font-size: 16px;
  line-height: 32px;
  padding: 0 18px;
  margin: 0 5px;
  border-radius: 8px;
  background-color: #efefef;
  transition: all 0.3s;
  &:hover {
    background-color: ${colors.primary};
    color: #fff;
    border: solid 1px ${colors.primary};
  }
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;
export const ReviewBtn = styled.button`
  font-size: 14px;
  line-height: 26px;
  padding: 0 15px;
  border-radius: 20px;
  border: solid 1px #000;
  margin: 8px 2px;
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
