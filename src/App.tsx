import { Session } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './api/user';
import { Loading } from './components';
import { logOutUser, setUser } from './redux/modules/user';
import Router from './shared/Router';
import GlobalStyle from './style/GlobalStyle';
import supabase from './supabase';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(true);

  const handleAuth = useCallback(
    async (session: Session | null) => {
      try {
        if (session) {
          const userData = await getUser(session.user.email);
          if (userData) {
            return dispatch(setUser(userData));
          }
        }
        dispatch(logOutUser());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleAuth(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      handleAuth(session);
    });
  }, [dispatch, handleAuth]);

  if (isLoading) return <Loading />;
  return (
    <>
      <Router />
      <GlobalStyle />
    </>
  );
}

export default App;
