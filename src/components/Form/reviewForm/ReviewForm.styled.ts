import styled from 'styled-components';
import { colors } from '../../../style/theme/colors';

export const Container = styled.div`
  position: fixed;
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
  padding: 40px;
`;

export const Description = styled.p`
  font-size: 18px;
  color: ${colors.gray};
  text-align: center;
`;

export const StarList = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  gap: 5px;
  justify-content: center;
  margin-bottom: 32px;
  cursor: pointer;
`;

export const StarItem = styled.li`
  img {
    width: 38px;
    filter: invert(78%) sepia(45%) saturate(4904%) hue-rotate(337deg) brightness(102%) contrast(99%);
  }
`;
export const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #2c2c2c;
  padding: 0 0 0 10px;
  border-left: solid 3px ${colors.primary};
`;

export const ReviewLabel = styled.label`
  display: block;
  margin-top: 20px;
  padding-bottom: 8px;
`;
export const ReviewInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border: 0;
  border-radius: 5px;
  outline: none;
  padding: 16px;
  font-size: 16px;
  background-color: #f9f9f9;
  color: ${colors.black};
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  border-radius: 5px;
  font-size: 16px;
  border: none;
  background-color: #f9f9f9;
  padding: 16px;
  color: ${colors.black};
  resize: none;
  outline: none;

  &::placeholder {
    color: ${colors.gray};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  & Button {
    margin-top: 30px;
  }
`;
export const CloseBtn = styled.button`
  width: 100%;
  text-align: right;
  height: 30px;
  img {
    height: 100%;
  }
`;
