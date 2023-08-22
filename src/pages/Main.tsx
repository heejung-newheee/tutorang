import { useEffect } from 'react';
import supabase from '../supabase';

const Main = () => {
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert(error.message);
    alert('로그아웃 되었습니다');
  };
  const checkFirstSocialSignin = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const checkingFirstSocialUser = user?.user_metadata.role;
    console.log(checkingFirstSocialUser);
    console.log(user);
  };
  useEffect(() => {
    checkFirstSocialSignin();
  }, []);

  return (
    <div>
      <h1>Main</h1>
      <button onClick={() => signOut()}>임시로그아웃버튼</button>
    </div>
  );
};

export default Main;
