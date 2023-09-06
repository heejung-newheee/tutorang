import styled, { css } from "styled-components";

export const ChatMessage = styled.li<{ $isMine: boolean; $isCustom: boolean }>`
  display: flex;
  gap: 0.5rem;
  flex-direction: ${({ $isMine }) => ($isMine ? 'row-reverse' : 'row')};
  align-items: flex-end;
`;

export const ChatTextMessageContent = styled.div<{ $isMine: boolean }>`
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





export const ChatMessageTime = styled.span`
  font-size: 0.8125rem;
  color: #949494;
`;