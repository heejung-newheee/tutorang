import { styled } from 'styled-components';
import { colors } from '../../../style/theme/colors';

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: end;
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
