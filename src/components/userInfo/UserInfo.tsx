import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBoard, fetchLike, fetchReview, fetchTutor, fetchUser } from '../../api/user';
import * as S from './UserInfo.styled';
import supabase from '../../supabase';
import { Tables } from '../../supabase/database.types';
// import { User } from '@supabase/supabase-js';

interface UserInfo {
  avatar_url: string | null;
  birth: string | null;
  deleted_at: string | null;
  email: string | null;
  gender: string | null;
  id: string;
  language_level: string | null;
  location1: string | null;
  location2: string | null;
  role: string | null;
  updated_at: string | null;
  username: string | null;
}
const UserInfo = () => {
  const { data, isLoading, isError } = useQuery(['profiles'], fetchUser);
  const [user, setUser] = useState<UserInfo | null>();

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (isError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }
  if (!user) {
    return <div>글 없음</div>;
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
          {user.name}
          <span> {user.role}</span>
        </S.UserName>
        <div>
          지역 : {user.location_1} | {user.location_2}
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
      </S.MypageContainer>
    </>
  );
};

export default UserInfo;
