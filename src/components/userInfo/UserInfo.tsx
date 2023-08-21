import { fetchUser } from '../../api/user';
import { useQuery } from '@tanstack/react-query';
import * as S from './UserInfo.styled';
import TutorInfo from '../tutorInfo/TutorInfo';
import StudentInfo from '../studentInfo/StudentInfo';

const UserInfo = () => {
  const { data: user, isLoading: userLoading, isError: userError } = useQuery(['user'], fetchUser);
  console.log(user);

  if (userLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (!user || userError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }

  const thisUser = user.find((item) => 123456 === item.id);

  if (!thisUser) {
    return <div>유저정보를 불러오지 못했습니다.</div>;
  }
  return (
    <>
      <S.MypageContainer>
        <div>내 정보</div>
        <button>내정보 수정</button>
        <S.ProfileBox>
          <img src={thisUser.profile_img ?? ''} alt="" />
        </S.ProfileBox>
        <S.UserName>
          {thisUser.name}
          <span> {thisUser.role}</span>
        </S.UserName>
        <div>
          지역 : {thisUser.location_1} | {thisUser.location_2}
        </div>
        <S.StudyInfoBox>
          <div>
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

        <TutorInfo user={user} thisUser={thisUser} />
        <StudentInfo user={user} />
      </S.MypageContainer>
    </>
  );
};

export default UserInfo;
