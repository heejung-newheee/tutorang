import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../../api/user';
import * as S from './UserInfo.styled';
import supabase from '../../supabase';
import TutorInfo from '../tutorInfo/TutorInfo';
import StudentInfo from '../studentInfo/StudentInfo';
// import { User } from '@supabase/supabase-js';
import store, { RootState } from '../../redux/config/configStore';

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
  // console.log(user); // 로그인 유저 정보 이걸 dispatch 하고 불러오기

  useEffect(() => {
    getUser();
    // 데이터 로드 완료 시 dispatch를 사용하여 Redux 상태 업데이트
    if (user) {
      dispatch(setUser(user)); // setUser 액션을 통해 데이터를 Redux 상태에 업데이트
    }
  }, [user, dispatch]);

  if (isLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (isError || !user) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }

  // const loginUserId = localStorage.getItem('sb-rkirhzqybhsglryysdso-auth-token');
  // const loginUserInfo = JSON.parse(loginUserId);
  // const userEmail = loginUserInfo.user.email;

  // const thisUser = user!.find((item) => userEmail === item.email);
  // console.log('thisUser', thisUser);

  // const likedList = like.filter((item) => item.user_id === thisUser!.id).map((item) => item.liked_id);
  // const likedUser = user!.filter((item) => likedList.includes(item.id));
  // const thisTutorInfo = tutor.find((item) => userEmail === item.user_id);
  // const update = thisTutorInfo!.created_at.split('T')[0];

  // const reviewData = review?.filter((item) => {
  //   return thisUser!.id === item.reviewed_id;
  // });

  // if (!thisUser) {
  //   return <div>유저정보를 불러오지 못했습니다.</div>;
  // }
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
