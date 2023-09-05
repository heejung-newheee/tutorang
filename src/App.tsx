import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './api/user';
import { Loading } from './components';
import { logOutUser, setUser } from './redux/modules/user';
import Router from './shared/Router';
import GlobalStyle from './style/GlobalStyle';
import supabase from './supabase';

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
  if (isLoading) return <Loading />;
  return (
    <>
      <Router />
      <GlobalStyle />
    </>
  );
}

export default App;
