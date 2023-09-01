import styled from 'styled-components';
import { colors } from '../../../style/theme/colors';
import { size } from '../../../style/theme/size';

export const Container = styled.section`
  background-color: ${colors.gray_100};
  padding-bottom: 80px;
`;

export const Inner = styled.div`
  width: 100%;
  max-width: ${size.globalInner};
  margin: 0 auto;
`;

export const Title = styled.h3`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 44px;
`;
