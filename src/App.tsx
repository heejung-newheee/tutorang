import { Session } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser, userUpdateAndGet } from './api/user';
import { Loading } from './components';
import { logOutUser, setUser } from './redux/modules/user';
import Router from './shared/Router';
import GlobalStyle from './style/GlobalStyle';
import supabase from './supabase';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(true);

  const handleAuth = useCallback(
    (session: Session | null) => {
      if (session) {
        console.log('이건 session', session);
        getUser(session.user.email)
          .then((data) => {
            console.log('이것은 내가 원하는 것이야 db profile data', data);
            if (data!.username === null) {
              const userName = session.user.user_metadata.name;
              const additionalData = {
                username: userName,
                role: 'student',
              };
              const renewalData = userUpdateAndGet(additionalData, session.user.id);
              return renewalData;
            } else {
              return data;
            }
          })
          .then((data) => {
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
