import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/config/configStore';
import { closeModal, openModal } from '../../../redux/modules';
import styled from 'styled-components';
import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../../../api/user';
import { Loading } from '../..';
import { Link } from 'react-router-dom';
import { AiOutlineAlert } from 'react-icons/ai';
import { HiOutlineAcademicCap } from 'react-icons/hi';

export const ChatPlayerDetailModal = () => {
  const dispatch = useDispatch();
  const targetId = useSelector((state: RootState) => state.modal.targetId as string);
  const userInfo = useQuery(['chat', targetId], () => getUserById(targetId));

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleReport = () => {
    dispatch(closeModal());
    dispatch(openModal({ type: 'report' }));
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (userInfo.isLoading) <Loading />;
  if (!userInfo.data) {
    dispatch(closeModal());
    return <></>;
  }

  const { id, age, username, role, location1_sido, location1_gugun, location2_gugun, location2_sido, avatar_url } = userInfo.data;
  return (
    <Container>
      <Inner>
        <ModalHeader>
          <div>
            <ReportButton onClick={handleReport}>
              <AiOutlineAlert />
              신고하기
            </ReportButton>
          </div>
          <RoleTitle>{role === 'tutor' ? '튜터' : '학생'}</RoleTitle>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleClose}>
              <IoClose size={30} />
            </IconButton>
          </div>
        </ModalHeader>
        <div>
          <ProfileImage src={avatar_url || ''} width={140} height={140} />
          <ProfileInfo>
            <HiOutlineAcademicCap size={'1.5rem'} color={'#373737'} />
            <ProfileUserName>
              {username}
              <span style={{ fontSize: '1rem' }}>({age})</span>
            </ProfileUserName>
          </ProfileInfo>
        </div>
        <ProfileLocation>
          <p>
            {location1_sido} {location1_gugun}
          </p>
          <p>
            {location2_sido} {location2_gugun}
          </p>
        </ProfileLocation>
        <TutorButtonWrapper>{role === 'tutor' && <TutorLink to={`/detail/${id}`}>튜터 정보 보러 가기</TutorLink>}</TutorButtonWrapper>
      </Inner>
    </Container>
  );
};

export default ChatPlayerDetailModal;

const Container = styled.div`
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

const Inner = styled.div`
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

const RoleTitle = styled.p`
  font-weight: 700;
  font-size: 1.25rem;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const ProfileUserName = styled.p`
  font-size: 1.25rem;
  margin-left: 0.5rem;
`;

const ProfileLocation = styled.div`
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

const TutorButtonWrapper = styled.div`
  color: #fff;
  width: 100%;
`;
