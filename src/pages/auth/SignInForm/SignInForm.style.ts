import styled, { css } from 'styled-components';

export const SnsIcon = styled.img<{ $iconType?: boolean }>`
  box-sizing: border-box;
  ${($iconType) => {
    if ($iconType)
      return css`
        width: 57px;
        height: 57px;
        @media screen and (max-width: 420px) {
          width: 50px;
          height: 50px;
        }
      `;
    else {
      return css`
        width: 58px;
        height: 58px;
        @media screen and (max-width: 420px) {
          width: 51px;
          height: 51px;
        }
      `;
    }
  }}

  border-radius: 100%;
  cursor: pointer;
  ${({ $iconType }) => {
    if ($iconType) return 'border: 1px solid #696969';
  }}
`;

export const UnderFormButton = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  & span {
    margin-top: 14px;
    height: 30px;
    font-size: 16px;
    color: #808080;
    cursor: pointer;
  }
`;

export const ButtonRelationArea = styled.div`
  position: relative;
`;

export const Footer = styled.footer`
  width: 100%;
  @media screen and (max-width: 420px) {
    height: 100px;
  }
`;

export const SnsIconContainer = styled.div`
  padding: 45px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 45px;
  @media screen and (max-width: 420px) {
    gap: 35px;
  }
`;

export const SignInResetButton = styled.button`
  position: absolute;
  right: 22px;
  bottom: 37px;
  z-index: 3;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  font-size: 16px;
  cursor: pointer;
  .reset_signin_input_btn {
    fill: #cdcdcd;
  }
  &:hover {
    cursor: pointer;
    .reset_signin_input_btn {
      fill: #696969;
    }
  }
  &:focus {
    .reset_signin_input_btn {
      fill: #696969;
    }
  }
  @media screen and (max-width: 420px) {
    right: 18px;
    bottom: 37px;
    width: 15px;
    height: 15px;
    font-size: 15px;
  }
`;
