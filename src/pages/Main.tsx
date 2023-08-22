import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../api/user';
import { Alert } from '../components';
import ProfileForm from '../components/Form/profileForm/CreateProfileForm';
import { useModal } from '../hooks';
import supabase from '../supabase';

const Main = () => {
  // 임시임.
  const [isFirstSocialUser, setIsFirstSocialUser] = useState(false);
  const { Modal, isOpen, openModal, closeModal } = useModal();
  const { data: user, isLoading: userLoading, isError: userError } = useQuery(['user'], fetchData);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert(error.message);
    alert('로그아웃 되었습니다');
  };

  const checkFirstSocialSignin = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user === null) return false;
    const checkingFirstSocialUser = user?.user_metadata.role;
    if (user !== null && checkingFirstSocialUser === undefined) setIsFirstSocialUser(true);
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

  if (userLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (userError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }

  return (
    <>
      {user?.map((user) => {
        return (
          <div key={user.id}>
            <Link to={`detail/${user.id}`}>{user.name}</Link>
          </div>
        );
      })}

      <Modal isOpen={isOpen} closeModal={closeModal}>
        <Alert closeModal={closeModal} />
      </Modal>
      <button onClick={openModal}>열기</button>

      <div>
        <h1>Main</h1>
        {isFirstSocialUser && <ProfileForm />}
        <button onClick={changeIt}>업데이트 유저(role 없애기)</button>
        <button onClick={() => signOut()}>임시로그아웃버튼</button>
      </div>
    </>
  );
};

export default Main;
