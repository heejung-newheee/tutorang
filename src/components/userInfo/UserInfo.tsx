import { fetchData, fetchLike, fetchTutor } from '../../api/user';
import { useQuery } from '@tanstack/react-query';
import * as S from './UserInfo.styled';

const UserInfo = () => {
  const { data: user, isLoading: userLoading, isError: userError } = useQuery(['user'], fetchData);
  const { data: like, isLoading: likeLoading, isError: likeError } = useQuery(['like'], fetchLike);
  const { data: tutor, isLoading: tutorLoading, isError: tutorError } = useQuery(['tutor'], fetchTutor);

  if (userLoading || likeLoading || tutorLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (!tutor || !user || !like || userError || likeError || tutorError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }

  return (
    <>
      <S.MypageContainer>
        <div>내 정보</div>
        <S.ProfileBox>{user[0].profile_img}</S.ProfileBox>
        <S.UserName>{user[0].name}</S.UserName>
        <div>권한 : {user[0].role}</div>
        <div>
          지역 : {user[0].location_1} | {user[0].location_2}
        </div>
        <S.StudyInfoBox>
          <div>완료된 수업</div>
          <div>문의중</div>
          <div>ooo</div>
        </S.StudyInfoBox>
        <div>
          <div>강사 대시보드</div>
          <div>수업레벨 : Lv 2</div>
          {user[0].id === tutor[0].user_id && <div>시간당 : {tutor[0].price}원</div>}
          본인 별점 후기 학생리스트 수익차트
        </div>
        <div>
          <div>학생 대시보드</div>
          찜한 강사
          <S.LikeTutorList>
            <S.LikeTutorItem>강사 찜목록1</S.LikeTutorItem>
            <S.LikeTutorItem>강사 찜목록2</S.LikeTutorItem>
          </S.LikeTutorList>
          수업했던 튜터
          <S.TutorList>
            <S.TutorItem>튜터1</S.TutorItem>
            <S.TutorItem>튜터2</S.TutorItem>
          </S.TutorList>
          문의 리스트
          <S.TutorList>
            <S.TutorItem>문의글 1</S.TutorItem>
            <S.TutorItem>문의글 2</S.TutorItem>
          </S.TutorList>
        </div>
      </S.MypageContainer>
    </>
  );
};

export default UserInfo;
