import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const NoRoomContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const NoRoomText = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  color: #808080;
`;

export const HeaderLeft = styled.div``;

export const HeaderCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  overflow: hidden;
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const HeaderButton = styled.button<{ color?: 'red' | 'blue' }>`
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  background-color: ${({ color }) => (color === 'red' ? '#c50404' : '#186af4')};
  border-radius: 20px;
  padding: 0.4rem 0.725rem;
  flex-shrink: 0;
`;

export const ChatArea = styled.div`
  overflow-y: auto;
  flex: 1;
  scroll-behavior: smooth;
`;

export const ChatList = styled.ul`
  display: flex;
  padding: 1.25rem;
  gap: 0.625rem;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`;

export const ChatDate = styled.li`
  text-align: center;
  position: relative;
`;

export const ChatDateDivider = styled.hr`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  margin: 0;
  height: 1px;
  border: none;
  border-top: 1px solid #ccc;
`;

export const ChatDateText = styled.span`
  color: #808080;
  z-index: 1;
  position: relative;
  background-color: #ffffff;
  padding: 0 0.5rem;
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

export const InputMenuButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  padding: 0.5rem;
  border-radius: 50%;
  transition: transform 200ms;
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      transform: rotate(135deg);
    `}

  &:hover,
  &:focus,
  &:focus-within {
    background-color: #eee;
  }
`;

export const InputMenu = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  height: ${({ $isOpen }) => ($isOpen ? '100px' : '0')};
  transition: height 200ms ease-out;
  overflow: hidden;
`;

export const InputMenuInner = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const InputMenuButtonItem = styled.button`
  padding: 0;
  width: 75px;
  height: 60px;
  border-radius: 10px;
  &:hover,
  &:focus,
  &:focus-within {
    background-color: #eee;
  }
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

export const IconButton = styled.button`
  display: flex;
  padding: 0.25rem;
  margin: 0;
  border-radius: 50%;
  &:hover,
  &:hover,
  &:focus,
  &:focus-within {
    background-color: #e7e7e7;
  }
`;
