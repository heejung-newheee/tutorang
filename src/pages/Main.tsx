import { useEffect, useState } from 'react';
import ProfileForm from '../components/Form/profileForm/CreateProfileForm';
import supabase from '../supabase';

const Main = () => {
  const [isFirstSocialUser, setIsFirstSocialUser] = useState(false);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert(error.message);
    alert('로그아웃 되었습니다');
  };

  // getUser
  const checkFirstSocialSignin = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const checkingFirstSocialUser = user?.user_metadata.role;
    if (checkingFirstSocialUser === undefined) setIsFirstSocialUser(true);
  };

  const changeIt = async () => {
    const { data, error } = await supabase.auth.updateUser({
      data: { role: null },
    });
    console.log(data);
    console.log(error?.message);
  };

  useEffect(() => {
    checkFirstSocialSignin();
  }, []);

  return (
    <div>
      <h1>Main</h1>
      {isFirstSocialUser && <ProfileForm />}
      <button onClick={() => signOut()}>임시로그아웃버튼</button>
      <button onClick={changeIt}>업데이트 유저(role 없애기)</button>
    </div>
  );
};

export default Main;
