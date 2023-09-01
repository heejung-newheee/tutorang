import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import supabase from '../supabase';

const AuthMain = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const checkSignInUser = async () => {
    supabase.auth.onAuthStateChange((_, session) => {
      if (session !== null) return navigate('/');
      if (session === null) setIsSignIn(false);
    });
  };

  useEffect(() => {
    checkSignInUser();
  }, []);

  if (isSignIn) return <div>loading</div>;

  return <Outlet />;
};

export default AuthMain;
