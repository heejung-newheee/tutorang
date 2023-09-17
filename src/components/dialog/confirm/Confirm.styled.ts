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
  padding: 30px;
  background-color: ${colors.white};
  border-radius: 18px;
  @media screen and (max-width: 1024px) {
    margin: 70px 0 0;
  }
  @media screen and (max-width: 768px) {
    margin: 50px 0 0;
    width: 100%;
    height: calc(100% - 50px);
    border-radius: 0;
    padding: 20px 10px 0;
  }
`;

export const ContentWrapper = styled.div`
  @media screen and (max-width: 1024px) {
    margin: 0 10px;
  }
  @media screen and (max-width: 768px) {
    padding: 48px 30px;
    margin: 0;
    position: relative;
    top: 30%;
  }
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
  padding-bottom: 30px;
  border-bottom: solid 1px #efefef;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  width: 50%;
  padding: 20px 20px 0;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3 ease;
  line-height: 1;
  text-align: center;
  color: #999;

  &.confirm {
    color: #c50404;
  }

  @media screen and (max-width: 1024px) {
    height: 60px;
  }
  @media screen and (max-width: 768px) {
    height: 50px;
  }
`;
