import { styled } from 'styled-components';
import { colors } from '../../style/theme/colors';

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: end;
  margin: 5px 0;
`;
export const ButtonAnnouncement = styled.button`
  border: 2px solid #cdcdcd;
  border-radius: 3px;
  padding: 4px 25px;
  margin: 5px 0 10px 5px;
  &:hover {
    border: 2px solid ${colors.primary};
    background-color: #fe902f2c;
  }
`;

export const TitleHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CSContent = styled.div`
  margin: 0px 0px 30px;
  border-top: solid 1px #ddd;
  border-bottom: solid 1px #ddd;
  padding: 30px 15px;
  font-size: 14px;
  & > div {
    margin-bottom: 20px;
    & > p {
      margin-bottom: 5px;
    }
  }
  &.border_bottom {
    border-bottom: none;
  }
`;

export const ContentAuth = styled.div`
  display: flex;
  justify-content: space-between;
`;
