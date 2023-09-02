import { useDispatch } from 'react-redux';
import GlobalModal from './components/modal/GlobalModal';
import Router from './shared/Router';
import GlobalStyle from './style/GlobalStyle';
import supabase from './supabase';
import { useEffect, useState } from 'react';
import { getUser } from './api/user';
import { logOutUser, setUser } from './redux/modules/user';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const loginUser = await getUser(session.user.email);
        if (loginUser) dispatch(setUser(loginUser));
      }
      setLoading(false);
    });

    supabase.auth.onAuthStateChange(async (_, session) => {
      if (session !== null) {
        const loginUser = await getUser(session.user.email);
        if (!loginUser) return;
        dispatch(setUser(loginUser));
      } else {
        dispatch(logOutUser());
      }
    });
  }, [dispatch]);
  if (isLoading) return <div>로그인 상태를 가져오는 중</div>;
  return (
    <>
      <Router />
      <GlobalStyle />
      <GlobalModal />
    </>
  );
}

export default App;
