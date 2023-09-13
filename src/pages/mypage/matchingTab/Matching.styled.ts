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
  border-top: solid 1px #efefef;
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
    width: 100%;
    font-size: 14px;
  }
`;

export const MatchBtnWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  @media screen and (max-width: 690px) {
    gap: 3px;
  }
`;
export const MatchBtn = styled.button`
  font-size: 16px;
  line-height: 32px;
  padding: 0 18px;
  border-radius: 20px;
  border: solid 1px #000;
  transition: all 0.3s;
  &:hover {
    background-color: ${colors.primary};
    color: #fff;
    border: solid 1px ${colors.primary};
  }
  @media screen and (max-width: 1024px) {
    padding: 0 15px;
  }

  @media screen and (max-width: 690px) {
    width: 80%;
    margin: 0 auto;
    padding: 0 5px;
    font-size: 12px;
  }
`;
