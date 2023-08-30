import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background-color: beige;
  overflow-y: auto;
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid #eaeaea;
  box-sizing: border-box;
`;

export const HeaderTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
`;

export const HeaderButton = styled.button`
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  background-color: #c50404;
  border-radius: 20px;
  padding: 0.4rem 0.725rem;
`;

export const ChatArea = styled.ul`
  display: flex;
  gap: 0.625rem;
  flex-direction: column;
  width: 100%;
  padding: 1.25rem;
  height: 500px;
  overflow-y: auto;
  margin-bottom: 80px;
`;

export const InputArea = styled.div`
  position: absolute;
  bottom: 0;
  padding: 0.625rem 1rem;
  width: 100%;
  background-color: #ffffff;
`;

export const FormInner = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const MessageInput = styled.input`
  font-size: 1rem;
  padding: 0.875rem;
  border-radius: 25px;
  text-indent: 0.5rem;
  width: 100%;
`;

export const SendButton = styled.button`
  border: 0;
  display: flex;
  background: #fe902f;
  cursor: pointer;
  padding: 9px;
  border-radius: 50%;
  &:hover,
  &:focus,
  &:focus-within {
    background-color: #b86720;
  }
`;

export const ChatMessage = styled.li<{ $isMine: boolean }>`
  text-align: ${({ $isMine }) => ($isMine ? 'right' : 'left')};
`;

export const ChatTextMessageContent = styled.li<{ $isMine: boolean }>`
  display: inline-block;
  background-color: #e0e0e0;
  color: #000000;
  border-radius: 50px;
  padding: 0.5rem 1rem;

  ${({ $isMine }) =>
    $isMine &&
    css`
      background-color: #fe902f;
      color: #ffffff;
    `}
`;

export const ChatCustomMessageContent = styled.li`
  display: inline-block;
  background-color: #e0e0e0;
  color: #000000;
  border-radius: 50px;
  padding: 0.5rem 1rem;
`;
