import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
    align-items: flex-end;
  }
`;

export const Inner = styled.div`
  position: relative;

  width: 100%;
  max-width: 400px;
  margin: 0 32px;
  background-color: #fff;
  border-radius: 18px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  @media screen and (max-width: 768px) {
    max-width: none;
    margin: 0;
    border-radius: 8px 8px 0 0;
  }
`;

export const IconButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
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

export const RoleTitle = styled.p`
  font-weight: 700;
  font-size: 1.25rem;
  text-align: center;
`;

export const ProfileImage = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileInfo = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export const ProfileUserName = styled.p`
  font-size: 1.25rem;
  margin-left: 0.5rem;
`;

export const ProfileAge = styled.span`
  font-size: 1rem;
`;

export const ProfileLocation = styled.div`
  font-size: 1.125rem;
`;

export const TutorLink = styled(Link)`
  display: inline-block;
  border-radius: 8px;
  padding: 1.25rem;
  font-size: 1.25rem;
  text-align: center;
  width: 100%;
  background-color: #fe902f;
  color: #fff;
`;

export const ReportButton = styled.button`
  color: rgb(128, 128, 128);
  font-size: 1rem;
  display: flex;
  align-items: flex-end;
  line-height: 1.05;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  & > * {
    flex: 1;
  }
`;

export const TutorButtonWrapper = styled.div`
  color: #fff;
  width: 100%;
`;
