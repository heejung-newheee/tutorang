// * 카카오 소셜 회원가입/로그인만 완료.
// * TODO 구글이랑 twitter 소셜 회원가입 등록 예정

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { google, kakaotalk, twitter } from '../../../assets';
import supabase from '../../../supabase';

const EMAIL_REGEX = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationCheck, setValidationCheck] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] =useState(false)
  // const [session, setSession] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidEmail = EMAIL_REGEX.test(email);
    if (!isValidEmail) {
      alert('이메일 형식을 맞춰서 입력해주세요');
      return false;
    }
    setLoading(true);
    const isAuthenticated = await emailCheckFromDB(email);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      isAuthenticated ? alert('비밀번호를 다시한 번 확인해주세요') : alert('해당 이메일로 회원가입되어있지 않습니다.');
    } else {
      setEmail('');
      setPassword('');
      navigate('/');
    }
    setLoading(false);
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
    console.log(data);
    // if (!data) {
    //   setLoading(true);
    // } else {
    //   setLoading(false);
    //   navigate('/');
    // }
  };

  const emailCheckFromDB = async (enteredEmail: string) => {
    // unverifiedEmail 을 supabase의 db 에서 확인
    const { data: profiles, error } = await supabase.from('profiles').select('email');
    const myEmailFromDB = profiles?.find((profile) => {
      return profile.email === enteredEmail;
    });
    const isMyEmailHere = myEmailFromDB === undefined ? false : true;
    console.log('????????', isMyEmailHere);
    // setDuplicatedEmail(isMyEmailHere);
    // setIsAuthenticated(true);
    return isMyEmailHere;
    console.log(error?.message);
  };

  useEffect(() => {
    if (email === '' || password === '') {
      setValidationCheck(false);
    } else {
      setValidationCheck(true);
    }
  }, [email, password]);
  return (
    <SContainer>
      {loading ? (
        <p>확인하는 동안 보여줄 내용 (or 스피너)</p>
      ) : (
        <>
          <SForm onSubmit={handleLogin}>
            <h3>로그인</h3>
            <SFormItem>
              <span>이메일</span>
              <SInput type="text" placeholder="이메일" name="email" value={email} onChange={handleInput} />
            </SFormItem>
            <SFormItem>
              <span>비밀번호</span>
              <SInput type="password" placeholder="비밀번호" name="password" value={password} onChange={handleInput} />
            </SFormItem>
            <SButton disabled={!validationCheck}>로그인</SButton>
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
  max-width: 1200px;
  min-width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const SFormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const SInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border: 1px solid #696969;
  border-radius: 3px;
  outline: none;
  padding: 8px;
  font-size: 16px;
  box-shadow: none;
`;

const SButton = styled.button<{ disabled: boolean }>`
  height: 40px;
  background-color: ${(props) => {
    if (props.disabled === true) return '#e7e7e7';
    else return '#FE902F';
  }};
  color: #fff;
  cursor: ${(props) => {
    if (props.disabled === true) return 'not-allowed';
    else return 'pointer';
  }};
  border-radius: 3px;
`;
