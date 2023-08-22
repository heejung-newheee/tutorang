<<<<<<< Updated upstream
import { useModal } from '../hooks';
import { Alert, Confirm } from '../components';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../api/user';
import { Link } from 'react-router-dom';


const Main = () => {
  const { Modal, isOpen, openModal, closeModal } = useModal();
  const { data: user, isLoading: userLoading, isError: userError } = useQuery(['user'], fetchData);


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
    </>
  );
};

export default Main;
