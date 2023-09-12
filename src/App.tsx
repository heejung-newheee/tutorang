import { Session } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser, userUpdateAndGet } from './api/user';
import { Loading } from './components';
import { TypeSigninUserDataForRedux, logOutUser, setUser } from './redux/modules/user';
import Router from './shared/Router';
import GlobalStyle from './style/GlobalStyle';
import supabase from './supabase';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(true);

  const handleAuth = useCallback(
    (session: Session | null) => {
      if (session) {
        console.log(session);
        getUser(session.user.email)
          .then((data) => {
            if (data!.username === null) {
              const userName = session.user.user_metadata.name;
              const additionalData = {
                username: userName,
                role: 'student',
                // provider: session.user.app_metadata.provider,  희정 작업중
              };
              const renewalData = userUpdateAndGet(additionalData, session.user.id);
              return renewalData;
            } else {
              return data;
            }
          })
          .then((data) => {
            if (data !== null) {
              const imARealSignInUserData: TypeSigninUserDataForRedux = { ...data, signinProvider: session.user.app_metadata.provider, signinProviders: session.user.app_metadata.providers };
              if (data) dispatch(setUser(imARealSignInUserData));
              else dispatch(logOutUser());
              setLoading(false);
            }
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
