import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
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

export const HeaderButton = styled.button<{ color?: 'red' | 'blue' }>`
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  background-color: ${({ color }) => (color === 'red' ? '#c50404' : '#186af4')};
  border-radius: 20px;
  padding: 0.4rem 0.725rem;
`;

export const ChatArea = styled.div`
  overflow-y: auto;
  flex: 1;
`;

export const ChatList = styled.ul`
  display: flex;
  padding: 1.25rem;
  gap: 0.625rem;
  flex-direction: column;
  width: 100%;
  /* padding: 1.25rem; */
  overflow-y: auto;
`;

export const InputArea = styled.div`
  padding: 0.625rem 1rem;
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid #eaeaea;
`;

export const FormInner = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const MessageInput = styled.input`
  font-size: 1rem;
  padding: 0.8125rem;
  border: none;
  border-radius: 25px;
  text-indent: 0.5rem;
  width: 100%;
  line-height: 1.5;
  background-color: #e7e7e7;
  outline: none;
  &:hover,
  &:focus,
  &:focus-within {
    box-shadow: 0 0 0 2px #808080;
  }
`;

export const SendButton = styled.button`
  border: 0;
  display: flex;
  background: #fe902f;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  &:hover,
  &:focus,
  &:focus-within {
    background-color: #b86720;
  }
`;

export const ChatMessage = styled.li<{ $isMine: boolean; $isCustom: boolean }>`
  display: flex;
  gap: 0.5rem;
  flex-direction: ${({ $isMine }) => ($isMine ? 'row-reverse' : 'row')};
  align-items: flex-end;
`;

export const ChatTextMessageContent = styled.p<{ $isMine: boolean }>`
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

export const ChatCustomMessageContent = styled.p<{ $customType: string }>`
  text-align: center;
  display: inline-block;
  background-color: #e0e0e0;
  color: #000000;
  border-radius: 10px;
  padding: 0.5rem 1rem;

  ${({ $customType }) =>
    $customType === 'request'
      ? css`
          background-color: #0085ef;
          color: #ffffff;
          padding: 1.25rem 1.5rem;
        `
      : $customType === 'accept'
      ? css`
          background-color: forestgreen;
          color: #ffffff;
          padding: 1.25rem 1.5rem;
        `
      : $customType === 'reject'
      ? css`
          background-color: #e42626;
          color: #ffffff;
          padding: 1.25rem 1.5rem;
        `
      : ''}
`;

export const ChatCustomMessageLink = styled(Link)`
  text-decoration: underline;
  line-height: 1.5;
  color: #ffffff;
  transition: color 200ms;
  &:hover,
  &:focus,
  &:focus-within {
    color: #000000;
  }
`;

export const ChatMessageTime = styled.span`
  font-size: 0.8125rem;
  color: #949494;
`;
