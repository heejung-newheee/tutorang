import styled from 'styled-components';
import { colors } from '../../../style/theme/colors';

export const Overlay = styled.div`
  position: fixed;
  z-index: 9;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
`;

export const Container = styled.div`
  position: relative;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Inner = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 32px;
  background-color: ${colors.white};
  border-radius: 18px;
  padding: 100px;
`;
