import styled from 'styled-components';

export const Toast = styled.div`
  width: 100%;

  &.success {
    background-color: green;
  }

  &.info {
    background-color: blue;
  }

  &.danger {
    background-color: red;
  }

  &.warning {
    background-color: yellow;
  }
`;

export const ButtonClose = styled.button``;
export const Message = styled.span``;
