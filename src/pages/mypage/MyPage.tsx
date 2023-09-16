import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { matchingTutorData } from '../../api/match';
import { getUserById } from '../../api/user';
import { Loading, UserInfo } from '../../components';
import { MATCHING_TUTOR_DATA_QUERY_KEY, USER_PROFILE_QUERY_KEY } from '../../constants/query.constant';
import { RootState } from '../../redux/config/configStore';
import { EmptyMyPage } from './MyPage.styled';
import MyBoard from './myBoard/MyBoard';
import StudentInfo from './studentInfo/StudentInfo';
import TutorInfo from './tutorInfo/TutorInfo';

const MyPage = () => {
  const loginUser = useSelector((state: RootState) => state.user.user!);
  const { data: matchList } = useQuery([MATCHING_TUTOR_DATA_QUERY_KEY], matchingTutorData);
  const { data: user, isLoading, isError } = useQuery([USER_PROFILE_QUERY_KEY], () => getUserById(loginUser.id));

  if (isLoading) return <Loading />;
  if (isError) {
    console.error(isError);
    return <div />;
  }

  return (
    <>
      <UserInfo match={matchList} user={user} />
      <EmptyMyPage></EmptyMyPage>

      {matchList && matchList.length > 0 ? <> {loginUser.role === 'tutor' ? <TutorInfo match={matchList} user={user} /> : <StudentInfo match={matchList} user={user} />}</> : <div>매칭 데이터가 없습니다.</div>}

      <MyBoard />
    </>
  );
};

export default MyPage;
