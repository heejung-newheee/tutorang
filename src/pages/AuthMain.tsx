import { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const AuthMain = () => {
  const [isSignin, setIsSignin] = useState(true);

  const handleGoToSignin = () => {
    setIsSignin(true);
  };

  const handleGoToSignup = () => {
    setIsSignin(false);
  };

  return (
    <div>
      {isSignin ? <SignInForm /> : <SignUpForm />}
      <button onClick={isSignin ? handleGoToSignup : handleGoToSignin}>{isSignin ? '회원가입으로 이동' : '로그인으로 이동'}</button>
    </div>
  );
};

export default AuthMain;
