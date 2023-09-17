import styled, { keyframes } from 'styled-components';

const toastFade = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`;

export const ToastLayout = styled.div`
  position: fixed;
  z-index: 99;
  right: 10px;
  top: 78px;
  border-radius: 5px;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    width: 90%;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;

export const Toast = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 280px;
  padding: 16px 16px;
  background-color: #fff;
  margin-top: 4px;
  animation: ${toastFade} 0.5s ease-in;

  border-bottom: 3px solid transparent;
  &.success {
    border-color: green;
  }

  &.info {
    border-color: blue;
  }

  &.danger {
    border-color: red;
  }

  &.warning {
    border-color: orange;
  }
`;

export const ButtonClose = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
`;
export const Message = styled.span`
  display: flex;
  align-items: center;

  & svg {
    margin-right: 8px;
  }
`;
export const typeInfo = styled.span`
  display: inline-block;
  content: '';
  width: 10px;
  height: 100%;
`;
