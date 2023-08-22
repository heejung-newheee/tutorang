import { useModal } from '../hooks';
import { Alert, Confirm } from '../components';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../api/user';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import supabase from '../supabase';

const Main = () => {
  const { Modal, isOpen, openModal, closeModal } = useModal();
  const { data: profiles, isLoading: profilesLoading, isError: profilesError } = useQuery(['profiles'], fetchData);

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

  if (profilesLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (profilesError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }

  return (
    <>
      <section>
        <h2>튜터리스트</h2>
        {profiles?.map((user) => {
          return (
            <div key={user.id}>
              <Link to={`detail/${user.id}`}>{user.username}</Link>
            </div>
          );
        })}
      </section>

      <Modal isOpen={isOpen} closeModal={closeModal}>
        <Alert closeModal={closeModal} />
      </Modal>
      <button onClick={openModal}>열기</button>

      <div>
        <h1>Main</h1>
        <button onClick={() => signOut()}>임시로그아웃버튼</button>
      </div>
    </>
  );
};

export default Main;
