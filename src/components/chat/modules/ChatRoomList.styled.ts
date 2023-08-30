import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ProfileName = styled.h4`
  font-size: 1rem;
  font-weight: 700;
`;

export const PreviewMessage = styled.p`
  font-size: 0.8125rem;
  color: #3c3c3c;
  margin-top: 8px;
`;

export const ProfileImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  width: 410px;
  border: 1px solid #ccc;
  overflow-y: auto;
`;

export const ChatRoomPreviewContainer = styled.li<{ $isCurrentRoom: boolean }>`
  padding: 20px;
  background-color: ${({ $isCurrentRoom }) => ($isCurrentRoom ? '#ffe6e6' : 'white')};
`;

export const ChatRoomPreviewLink = styled(Link)`
  display: flex;
  gap: 11px;
`;
