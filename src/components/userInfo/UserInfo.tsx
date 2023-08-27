import * as S from './UserInfo.styled';
import TutorInfo from '../tutorInfo/TutorInfo';
import StudentInfo from '../studentInfo/StudentInfo';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config/configStore';
import { getMatchData, matchingTutorData } from '../../api/match';
import { useQuery } from '@tanstack/react-query';

const UserInfo = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { data, isLoading, isError } = useQuery(['matching_tutor_data'], matchingTutorData);
  console.log('UserInfo 로그인사용자', user);
  console.log('matchData', data);
  if (!user) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }

  return (
    <>
      <S.MypageContainer>
        <div>내 정보</div>
        <button>내정보 수정</button>
        <S.ProfileBox>
          <img src={user.avatar_url ?? ''} alt="" />
        </S.ProfileBox>
        <S.UserName>
          {user.username}
          <span> {user.role}</span>
        </S.UserName>
        <div>
          지역 : {user.location1} | {user.location2}
        </div>
        <S.StudyInfoBox>
          <div>
            {/* 매칭 후 데이터 불러와야함 */}
            <p>완료된 수업</p>
            <p>X개</p>
          </div>
          <div>
            <p>문의중</p>
            <p>X개</p>
          </div>
          <div>
            <p>ooo</p>
            <p>X개</p>
          </div>
        </S.StudyInfoBox>
        {data && data.length > 0 ? (
          <>
            <TutorInfo match={data} />
            <StudentInfo match={data} />
          </>
        ) : (
          <div>매칭 데이터가 없습니다.</div>
        )}
      </S.MypageContainer>
    </>
  );
};

export default UserInfo;
