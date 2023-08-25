import styled from 'styled-components';
import { colors } from '../../../style/theme/colors';

export const Container = styled.div`
  position: absolute;
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Inner = styled.div`
  position: relative;
  z-index: 999;
  width: 100%;
  max-width: 600px;
  margin: 0 32px;
  background-color: ${colors.white};
  border-radius: 18px;
`;

export const ContentWrapper = styled.div`
  padding: 48px 60px 0 60px;
`;

export const Textarea = styled.textarea`
  position: relative;
  top: 0;
  width: 100%;
  height: 260px;
  margin-top: 24px;
  border-radius: 8px;
  font-size: 16px;
  border: none;
  background-color: #f9f9f9;
  padding: 16px;
  color: ${colors.black};
  resize: none;

  &::placeholder {
    color: ${colors.gray};
  }
`;

export const Title = styled.h3`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
`;

export const Description = styled.p`
  font-size: 18px;
  color: ${colors.gray};
  text-align: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;

  & Button {
    height: 80px;
  }
`;

export const StarList = styled.ul`
  display: flex;
`;
