import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/config/configStore';
import { closeModal, openModal } from '../../../redux/modules';
import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../../../api/user';
import { Loading } from '../..';
import { AiOutlineAlert } from 'react-icons/ai';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import * as S from './ChatPlayerDetailModal.styled';

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
    <S.Container>
      <S.Inner>
        <S.ModalHeader>
          <div>
            <S.ReportButton onClick={handleReport}>
              <AiOutlineAlert />
              신고하기
            </S.ReportButton>
          </div>
          <S.RoleTitle>{role === 'tutor' ? '튜터' : '학생'}</S.RoleTitle>
          <S.IconButtonWrapper>
            <S.IconButton onClick={handleClose}>
              <IoClose size={30} />
            </S.IconButton>
          </S.IconButtonWrapper>
        </S.ModalHeader>
        <div>
          <S.ProfileImage src={avatar_url || ''} width={140} height={140} />
          <S.ProfileInfo>
            <HiOutlineAcademicCap size={'1.5rem'} color={'#373737'} />
            <S.ProfileUserName>
              {username}
              <S.ProfileAge>({age})</S.ProfileAge>
            </S.ProfileUserName>
          </S.ProfileInfo>
        </div>
        <S.ProfileLocation>
          <p>
            {location1_sido} {location1_gugun}
          </p>
          <p>
            {location2_sido} {location2_gugun}
          </p>
        </S.ProfileLocation>
        <S.TutorButtonWrapper>{role === 'tutor' && <S.TutorLink to={`/detail/${id}`}>튜터 정보 보러 가기</S.TutorLink>}</S.TutorButtonWrapper>
      </S.Inner>
    </S.Container>
  );
};

export default ChatPlayerDetailModal;
