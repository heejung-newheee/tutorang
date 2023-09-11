import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ChatRoomPreviewContainer = styled.li<{ $isCurrentRoom: boolean }>`
  padding: 1.25rem;
  background-color: ${({ $isCurrentRoom }) => ($isCurrentRoom ? '#ffe6e6' : 'white')};
  border-bottom: 1px solid #eaeaea;
  box-sizing: border-box;
`;

export const ChatRoomPreviewLink = styled(Link)`
  display: flex;
  gap: 11px;
`;

export const ProfileImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileImage = styled.img`
  object-fit: cover;
  border-radius: 50%;
`;

export const PreviewContent = styled.div`
  overflow: hidden;
`;

export const PreviewTitle = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.4375rem;
`;

export const ProfileName = styled.span`
  font-size: 1rem;
  font-weight: 700;
`;

export const PreviewTime = styled.span`
  color: #3c3c3c;
  font-size: 0.8125rem;
`;

export const PreviewMessage = styled.p`
  font-size: 0.8125rem;
  color: #3c3c3c;
  margin-top: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
