import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../api/user';
import { Link } from 'react-router-dom';

const Main = () => {
  const { data: profiles, isLoading: profilesLoading, isError: profilesError } = useQuery(['profiles'], fetchData);

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
    </>
  );
};

export default Main;
