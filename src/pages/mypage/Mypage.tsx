import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { matchingTutorData } from '../../api/match';
import { UserInfo } from '../../components';
import { MATCHING_TUTOR_DATA_QUERY_KEY } from '../../constants/query.constant';
import { RootState } from '../../redux/config/configStore';
import { EmptyMypage } from './Mypage.styled';
import MyBoard from './myBoard/MyBoard';
import StudentInfo from './studentInfo/StudentInfo';
import TutorInfo from './tutorInfo/TutorInfo';

const Mypage = () => {
  const loginUser = useSelector((state: RootState) => state.user.user!);
  const { data: matchList } = useQuery([MATCHING_TUTOR_DATA_QUERY_KEY], matchingTutorData);
  return (
    <>
      <UserInfo match={matchList} />
      <EmptyMypage></EmptyMypage>
      {matchList && matchList.length > 0 ? <> {loginUser.role === 'tutor' ? <TutorInfo match={matchList} /> : <StudentInfo match={matchList} />}</> : <div>매칭 데이터가 없습니다.</div>}
      <MyBoard />
    </>
  );
};

export default Mypage;
