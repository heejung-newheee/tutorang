import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './api/user';
import { Loading } from './components';
import { logOutUser, setUser } from './redux/modules/user';
import Router from './shared/Router';
import GlobalStyle from './style/GlobalStyle';
import supabase from './supabase';
import { Session } from '@supabase/supabase-js';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(true);

  const handleAuth = useCallback(
    (session: Session | null) => {
      if (session) {
        getUser(session.user.email).then((data) => {
          if (data) dispatch(setUser(data));
          else dispatch(logOutUser());
          setLoading(false);
        });
      } else {
        dispatch(logOutUser());
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
