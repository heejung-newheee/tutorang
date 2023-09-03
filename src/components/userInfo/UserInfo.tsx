import * as S from './UserInfo.styled';
import TutorInfo from '../tutorInfo/TutorInfo';
import StudentInfo from '../studentInfo/StudentInfo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/config/configStore';
import { matchingTutorData } from '../../api/match';
import { useQuery } from '@tanstack/react-query';
import { icon_edit, icon_location } from '../../assets';
import { openModal } from '../../redux/modules';
import { getReceivedWriteReviewCount, getWriteReviewCount } from '../../api/review';
import { getUserProfile } from '../../api/chat';
import { Loading } from '..';

export const MATCHING_TUTOR_DATA_QUERY_KEY = ['matching_tutor_data'];
export const USER_PROFILE_QUERY_KEY = ['profiles'];
const UserInfo = () => {
  const dispatch = useDispatch();
  const loginUserId = useSelector((state: RootState) => state.user.user!.id);
  const { data: user, isLoading, isError, error } = useQuery(USER_PROFILE_QUERY_KEY, () => getUserProfile(loginUserId));
  const { data } = useQuery(MATCHING_TUTOR_DATA_QUERY_KEY, matchingTutorData);

  const writeReviewCount = useQuery(['writeReviewCount'], () => getWriteReviewCount(user!.id));
  const receivedReviewCount = useQuery(['receivedReviewCount'], () => getReceivedWriteReviewCount(user!.id));

  if (isLoading) {
    return <Loading />;
  }
  if (!user) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }
  if (isError) {
    console.log('supabase Error', error);
    return null;
  }
  const handleEditProfiles = () => {
    dispatch(openModal({ type: 'editProfiles' }));
  };

  // TODO Cannot read properties of undefined (reading 'id') 에러 계속뜸! 순서 바꾸면 에러남
  //학생의 매칭 결과 배열
  const studentMatch = data?.filter((item) => item.user_id === user.id);
  // console.log(studentMatch);
  // 튜터의 매칭 결과
  const tutorMatch = data?.filter((item) => item.tutor_id === user.id);
  // console.log(tutorMatch);

  return (
    <>
      <S.MypageContainer>
        <S.ProfileBox>
          <S.Container>
            <S.ProfileImg>
              <S.UserImg src={user.avatar_url ?? ''} alt="user profile" />
              <S.EditBtn onClick={handleEditProfiles}>
                <img src={icon_edit} alt="" />
              </S.EditBtn>
            </S.ProfileImg>
            <S.UserName>
              {user.username}
              <span> {user.role}</span>
            </S.UserName>
            <S.TutorLocationBox>
              <img src={icon_location} alt="" /> {user.location1_sido} | {user.location1_gugun} <img src={icon_location} alt="" /> {user.location2_sido} | {user.location2_gugun}
            </S.TutorLocationBox>
            <S.Summary>
              {user.role === 'tutor' ? (
                <>
                  <S.SummaryItem>
                    <p>{tutorMatch?.filter((a) => a.matched === true).length}개</p>
                    <p>완료된 수업</p>
                  </S.SummaryItem>
                  <S.SummaryItem>
                    <p>{tutorMatch?.filter((a) => a.matched === false).length}개</p>
                    <p>대기 요청</p>
                  </S.SummaryItem>
                  <S.SummaryItem>
                    <p>{receivedReviewCount.data}개</p>
                    <p>나에게 남긴 후기</p>
                  </S.SummaryItem>
                </>
              ) : user.role === 'student' ? (
                <>
                  <S.SummaryItem>
                    <p>{studentMatch?.filter((a) => a.matched === true).length}개</p>
                    <p>완료된 수업</p>
                  </S.SummaryItem>
                  <S.SummaryItem>
                    <p>{studentMatch?.filter((a) => a.matched === false).length}개</p>
                    <p>대기 요청</p>
                  </S.SummaryItem>
                  <S.SummaryItem>
                    <p>{writeReviewCount.data}개</p>
                    <p>내가 남긴 후기</p>
                  </S.SummaryItem>
                </>
              ) : (
                <>{/* 관리자일 경우 ?  */}</>
              )}
            </S.Summary>
          </S.Container>
        </S.ProfileBox>

        <div style={{ height: '120px' }}></div>
        {data && data.length > 0 ? <>{user.role === 'tutor' ? <TutorInfo match={data} /> : <StudentInfo match={data} />}</> : <div>매칭 데이터가 없습니다.</div>}
      </S.MypageContainer>
    </>
  );
};

export default UserInfo;
