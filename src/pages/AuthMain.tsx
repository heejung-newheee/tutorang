import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import supabase from '../supabase';

const AuthMain = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const checkSignInUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log('getUser', user);
    if (user !== null) return navigate('/');
    if (user === null) setIsSignIn(false);
  };

  useEffect(() => {
    checkSignInUser();
  }, []);

  if (isSignIn) return <div>loading</div>;

  return <Outlet />;
};

export default AuthMain;

// * 아래 TODO 표시 되어있는 부분 주석 해제하고 그대로 사용하면 됩니다!
// TODO 'checkingFirstSocialUser' 가 undefined이면 세부정보등록 필요 ELSE(=role이 부여되어있으면) 세부정보 등록 불필요
// * supabase.auth.getUser() => 이 API가 현재 로그인한 유저정보 불러오는거!(localStorage에 저장된 유저정보 불러오는거)
// const checkFirstSocialSignin = async () => {
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
//   const checkingFirstSocialUser = user?.user_metadata.role;
// };

// TODO [세부정보등록 마지막단계] home에서 필수 가입정보 기입 안한사람 form 입력하게 만들고 '제출하기 전' auth.updateUser로 localStorage auth meta 정보에 role 도 같이 넣어줘야함!
// const changeIt = async () => {
//   const { data, error } = await supabase.auth.updateUser({
//     data: { role: 'tutor' },
//   });
//   console.log(data);
//   console.log(error?.message);
// };

// TODO 로그아웃 함수 --> 일단은 main에 넣어둠
// const signOut = async () => {
//   const { error } = await supabase.auth.signOut();
//   if (error) alert(error.message);
//   alert('로그아웃 되었습니다');
// };
