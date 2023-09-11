import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { matchingTutorData } from '../../../api/match';
import { getReceivedWriteReviewCount, getWriteReviewCount } from '../../../api/review';
import { icon_edit, icon_location } from '../../../assets';
import { Loading } from '../../../components';
import { MATCHING_TUTOR_DATA_QUERY_KEY, RECEIVED_REVIEW_COUNT, USER_PROFILE_QUERY_KEY, WRITE_REVIEW_COUNT } from '../../../constants/query.constant';
import { RootState } from '../../../redux/config/configStore';
import StudentInfo from '../studentInfo/StudentInfo';
import TutorInfo from '../tutorInfo/TutorInfo';
import * as S from './UserInfo.styled';
import { getUserById } from '../../../api/user';

const UserInfo = () => {
  const navigate = useNavigate();
  const loginUser = useSelector((state: RootState) => state.user.user!);
  const { data: user, isLoading, isError } = useQuery([USER_PROFILE_QUERY_KEY], () => getUserById(loginUser.id));
  const { data: matchList } = useQuery([MATCHING_TUTOR_DATA_QUERY_KEY], matchingTutorData);
  const writeReviewCount = useQuery([WRITE_REVIEW_COUNT, user], () => getWriteReviewCount(user!.id), { enabled: !!user });
  const receivedReviewCount = useQuery([RECEIVED_REVIEW_COUNT], () => getReceivedWriteReviewCount(user!.id), { enabled: !!user });

  if (isLoading) {
    return <Loading />;
  }
  if (!user) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }
  if (isError) {
    console.error('Error', isError);
    return null;
  }
  const handleEditProfiles = () => {
    if (!loginUser?.gender) {
      const wannaAddMoreInfo = window.confirm('소셜로그인을 하셨는데 아직 추가정보를 입력하지 않았다구요? 더 많은 기능을 이용하기 위해 추가정보등록이 필요합니다. 등록하시러 가시겠습니까?');
      if (wannaAddMoreInfo) {
        navigate('/additional-information');
      } else return false;
    } else {
      navigate('/edit-profiles');
    }
  };

  const studentMatch = matchList?.filter((item) => item.user_id === user.id);
  const tutorMatch = matchList?.filter((item) => item.tutor_id === user.id);
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
                    <p>{tutorMatch?.filter((a) => a.status === 'complete').length}개</p>
                    <p>완료된 수업</p>
                  </S.SummaryItem>
                  <S.SummaryItem>
                    <p>{tutorMatch?.filter((a) => a.status === 'request').length}개</p>
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
                    <p>{studentMatch?.filter((a) => a.status === 'complete').length}개</p>
                    <p>완료된 수업</p>
                  </S.SummaryItem>
                  <S.SummaryItem>
                    <p>{studentMatch?.filter((a) => a.status === 'request').length}개</p>
                    <p>대기 요청</p>
                  </S.SummaryItem>
                  <S.SummaryItem>
                    <p>{writeReviewCount.data}개</p>
                    <p>내가 남긴 후기</p>
                  </S.SummaryItem>
                </>
              ) : (
                <></>
              )}
            </S.Summary>
          </S.Container>
        </S.ProfileBox>

        <S.EmptyMypage></S.EmptyMypage>
        {matchList && matchList.length > 0 ? <>{user.role === 'tutor' ? <TutorInfo match={matchList} /> : <StudentInfo match={matchList} />}</> : <div>매칭 데이터가 없습니다.</div>}
      </S.MypageContainer>
    </>
  );
};

export default UserInfo;
