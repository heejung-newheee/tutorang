import { useDispatch } from 'react-redux';
import GlobalModal from './components/modal/GlobalModal';
import Router from './shared/Router';
import GlobalStyle from './style/GlobalStyle';
import supabase from './supabase';
import { useEffect } from 'react';
import { getUser } from './api/user';
import { logOutUser, setUser } from './redux/modules/user';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (_, session) => {
      if (session !== null) {
        const loginUser = await getUser(session.user.email);

        if (!loginUser) return;
        dispatch(setUser(loginUser));
      } else {
        dispatch(logOutUser());
      }
    });
  }, []);

  return (
    <>
      <Router />
      <GlobalStyle />
      <GlobalModal />
    </>
  );
}

export default App;
