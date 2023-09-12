import { styled } from 'styled-components';
import { colors } from '../../../style/theme/colors';

// export const ButtonsWrapper = styled.div`
//   box-sizing: border-box;
//   padding: 20px;
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
// `;

export const ButtonAnnouncement = styled.button`
  border: 2px solid #cdcdcd;
  border-radius: 3px;
  padding: 4px 25px;
  &:hover {
    border: 2px solid ${colors.primary};
    background-color: #fe902f2c;
  }
`;