// * 카카오 소셜 회원가입/로그인만 완료.
// * TODO 구글이랑 twitter 소셜 회원가입 등록 예정

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { google, kakaotalk, twitter } from '../../../assets';
import supabase from '../../../supabase';

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [session, setSession] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      alert('check your email for the login link!');
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        // 👉️ err is type Error here
        console.log(error.message);

        return;
      }

      console.log('Unexpected error', error);

      return;
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
      console.log(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
      console.log(e.target.value);
    }
  };

  const handleGoToSignup = () => {
    navigate('/signup');
  };

  const kakaoLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    });
    if (error) alert(error.message);
    if (data) console.log(data);
  };
  return (
    <SContainer>
      {loading ? (
        <p>로그인중임</p>
      ) : (
        <>
          <SForm onSubmit={handleLogin}>
            <h3>로그인</h3>
            <input type="text" placeholder="이메일" name="email" value={email} onChange={handleInput} />
            <input type="password" placeholder="비밀번호" name="password" value={password} onChange={handleInput} />
            {/* <p>패스워드 저장하기</p>  */}
            <p>비밀번호 찾기</p>
            <button>로그인</button>
          </SForm>
          <SImg src={kakaotalk} onClick={() => kakaoLogin()} />
          <SImg src={google} onClick={() => kakaoLogin()} />
          <SImg src={twitter} onClick={() => kakaoLogin()} />
        </>
      )}
      <button onClick={handleGoToSignup}>회원가입으로 이동</button>
    </SContainer>
  );
};

export default SignInForm;

const SContainer = styled.section`
  margin-top: 100px;
`;
const SForm = styled.form`
  width: 400px;
  height: 500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SImg = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
