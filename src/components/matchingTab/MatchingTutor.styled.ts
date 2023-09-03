import { Tab, TabList } from 'react-tabs';
import { styled } from 'styled-components';

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
    width: 20%;
  }
`;
