import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const ChatCustomMessageContent = styled.div<{ $customType: string }>`
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