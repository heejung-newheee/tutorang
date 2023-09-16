import { Link } from 'react-router-dom';
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
  padding: 20px 0;
  align-items: center;
  border-top: solid 1px #efefef;
  > div {
    width: 25%;
    padding: 5px;
  }

  &.matching {
    text-align: center;
    height: 56px;
    border-top: 0;
  }
`;
export const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;
export const UserLinkWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  a,
  button {
    font-size: 16px;
    line-height: 32px;
    padding: 0 10px;
    margin: 5px 0;
    border-radius: 8px;
    background-color: #efefef;
    transition: all 0.3s;
    &:hover {
      background-color: ${colors.primary};
      color: #fff;
    }
    @media only screen and (max-width: 768px) {
      width: 100%;
      font-size: 14px;
    }
  }
`;
export const UserLink = styled(Link)``;
export const ChatLink = styled.button``;

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
