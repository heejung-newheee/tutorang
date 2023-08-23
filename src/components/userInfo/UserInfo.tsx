import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../../api/user';
import * as S from './UserInfo.styled';
import supabase from '../../supabase';
import TutorInfo from '../tutorInfo/TutorInfo';
import StudentInfo from '../studentInfo/StudentInfo';

import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/modules/user';

const UserInfo = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useQuery(['profiles'], fetchData);
  const [email, setEmail] = useState<string>();

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setEmail(user?.email);
  };
  const user = data?.find((item) => {
    return item.email === email;
  });

  useEffect(() => {
    getUser();
    if (user) {
      dispatch(setUser(user));
    }
  }, [user, dispatch]);

  if (isLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (isError || !user) {
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

        <TutorInfo />
        <StudentInfo />
      </S.MypageContainer>
    </>
  );
};

export default UserInfo;
