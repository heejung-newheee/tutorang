// * 카카오 소셜 회원가입/로그인만 완료.
// * TODO 구글이랑 twitter 소셜 회원가입 등록 예정

import { useEffect, useState } from 'react';
import { BsXCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';
import { googleicon, kakaotalk, navericon } from '../../../assets';
import supabase from '../../../supabase';
import './../inputBackgroundSetting.css';

const EMAIL_REGEX = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;

const SignInForm = () => {
  // const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationCheck, setValidationCheck] = useState(false);
  const [guideMessage, setGuideMessage] = useState({ email: '', password: '' });
  // const [isAuthenticated, setIsAuthenticated] =useState(false)
  // const [session, setSession] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidEmail = EMAIL_REGEX.test(email);
    if (!isValidEmail) {
      setGuideMessage({ email: '이메일 형식을 맞춰서 입력해주세요', password: '' });
      return false;
    }
    // setLoading(true);
    const isAuthenticated = await emailCheckFromDB(email);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      isAuthenticated ? setGuideMessage({ email: '', password: '비밀번호를 다시한 번 확인해주세요' }) : setGuideMessage({ email: '해당 이메일로 회원가입되어있지 않습니다.', password: '' });
    } else {
      setEmail('');
      setPassword('');
      navigate('/');
    }
    // setLoading(false);
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
      {/* {loading ? (
        <p>확인하는 동안 보여줄 내용 (or 스피너)</p>
      ) : (
        <> */}
      <SHeader>
        <h1>로그인</h1>
        <p>쉽고 빠르게 튜터를 만나보는 1:1 매칭 서비스 튜터랑</p>
      </SHeader>
      <SPartitionLine />
      <SFormContainer>
        <SForm onSubmit={handleLogin}>
          <SFormItem>
            <label htmlFor="email">이메일</label>
            <SInput type="text" id="email" placeholder="이메일을 입력하세요" name="email" value={email} onChange={handleInput} />
            <BsXCircleFill className="reset_signin_input_btn" onClick={() => setEmail('')} />
            <SPGuideMessage>{guideMessage.email && guideMessage.email}</SPGuideMessage>
          </SFormItem>
          <SFormItem>
            <label htmlFor="password">비밀번호</label>
            <SInput type="password" id="password" placeholder="비밀번호를 입력하세요" name="password" value={password} onChange={handleInput} />
            <BsXCircleFill className="reset_signin_input_btn" onClick={() => setPassword('')} />
            <SPGuideMessage>{guideMessage.password && guideMessage.password}</SPGuideMessage>
          </SFormItem>
          <SButtonRelationArea>
            <SButton type="submit" disabled={!validationCheck}>
              로그인
            </SButton>
            <SUnderFormButton>
              <span onClick={handleGoToSignup}>회원가입</span>
            </SUnderFormButton>
          </SButtonRelationArea>
        </SForm>
      </SFormContainer>
      <SPartitionLine>
        <p>
          <span>간편로그인/회원가입으로 시작하기</span>
        </p>
      </SPartitionLine>
      <SFooter>
        <SsnsIconContainer>
          <SsnsIcon src={kakaotalk} onClick={() => kakaoLogin()} />
          <SsnsIcon src={googleicon} $iconType={'google'} onClick={() => kakaoLogin()} />
          <SsnsIcon src={navericon} onClick={() => kakaoLogin()} />
        </SsnsIconContainer>
      </SFooter>
      {/* </> */}
      {/* )} */}
    </SContainer>
  );
};

export default SignInForm;

const SContainer = styled.div``;

const SHeader = styled.header`
  width: 100%;
  height: 175px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 10px;
  & h1 {
    font-size: 32px;
    font-weight: 700;
  }
  & p {
    font-size: 20px;
    color: #4a4a4a;
  }
`;

const SPartitionLine = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  background-color: #eaeaea;
  & p {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -10px;
    & span {
      background-color: #fff;
    }
  }
`;

const SFormContainer = styled.div`
  height: 600px;
  /* padding: 50px 20px; */
`;

const SForm = styled.form`
  margin: 0 auto;
  padding: 100px 20px 50px;
  /* box-sizing: border-box; */
  /* max-width: 806px; */
  max-width: 846px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const SsnsIcon = styled.img<{ $iconType?: string }>`
  /* width: 40px;
  height: 40px; */
  box-sizing: border-box;
  ${({ $iconType }) => {
    if ($iconType === 'google')
      return css`
        width: 72px;
        height: 72px;
      `;
    else {
      return css`
        width: 70px;
        height: 70px;
      `;
    }
  }}

  border-radius: 100%;
  cursor: pointer;
  ${({ $iconType }) => {
    if ($iconType === 'google') return 'border: 1px solid #696969';
  }}
`;

const SFormItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SInput = styled.input`
  padding: 5px 50px 5px 12px;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border: 1px solid #696969;
  border-radius: 3px;
  outline: none;
  font-size: 16px;
`;

const SPGuideMessage = styled.p`
  color: #ff003e;
`;

const SButton = styled.button<{ disabled: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-radius: 3px;
  background-color: ${(props) => {
    if (props.disabled === true) return '#e7e7e7';
    else return '#FE902F';
  }};
  color: #fff;
  cursor: ${(props) => {
    if (props.disabled === true) return 'not-allowed';
    else return 'pointer';
  }};
  margin-top: 85px;
`;

const SUnderFormButton = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  & span {
    margin-top: 14px;
    height: 30px;
    font-size: 16px;
    /* display: flex; */
    /* justify-content: end; */
    /* align-items: center; */
    /* padding: 0; */
    color: #808080;
    cursor: pointer;
  }
`;

const SButtonRelationArea = styled.div`
  position: relative;
`;

const SFooter = styled.footer`
  width: 100%;
  height: 430px;
`;

const SsnsIconContainer = styled.div`
  padding: 55px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 45px;
`;
