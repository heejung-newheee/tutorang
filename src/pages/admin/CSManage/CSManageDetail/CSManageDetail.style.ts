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

export const CSContent = styled.div`
  margin: 30px 0;
  border-top: solid 1px #ddd;
  border-bottom: solid 1px #ddd;
  padding: 30px 15px;
  font-size: 14px;
  > div {
    margin-bottom: 20px;
    > p {
      margin-bottom: 5px;
    }
  }
`;

export const ContentAuth = styled.div`
  display: flex;
  justify-content: space-between;
`;
