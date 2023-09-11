import { styled } from 'styled-components';
import { colors } from '../../../../style/theme/colors';

export const Button = styled.button`
  background-color: #fff;
  border: 2px solid #cdcdcd;
  border-radius: 3px;
  padding: 4px 25px;
  &:hover {
    border: 2px solid ${colors.primary};
    background-color: #fe902f2c;
  }
`;
