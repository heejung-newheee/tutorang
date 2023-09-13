import { useEffect, useState } from 'react';
import { BsXCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';
import { googleicon, kakaotalk, navericon } from '../../../assets';
import { SButton, SContainer, SForm, SFormContainer, SFormItem, SInput, SPGuideMessage, SPartitionLine } from '../../../components/Form/AuthForm.styled';
import FormHeader from '../../../components/Form/FormHeader';
import '../../../components/Form/icon.css';
import '../../../components/Form/inputBackgroundSetting.css';
import { EMAIL_REGEX, FORM_CONSTANT_TITLE_SIGNIN } from '../../../constants/formConstant';
import supabase from '../../../supabase';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationCheck, setValidationCheck] = useState(false);
  const [guideMessage, setGuideMessage] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidEmail = EMAIL_REGEX.test(email);
    if (!isValidEmail) {
      setGuideMessage({ email: '이메일 형식을 맞춰서 입력해주세요', password: '' });
      return false;
    }

    const isAuthenticated = await emailCheckFromDB(email);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message === 'Email not confirmed') {
        setGuideMessage({ email: '해당 이메일에서 회원가입승인 링크를 눌러주세요!', password: '' });
      } else if (isAuthenticated) {
        setGuideMessage({ email: '', password: '비밀번호를 다시한 번 확인해주세요' });
      } else {
        setGuideMessage({ email: '해당 이메일로 회원가입되어있지 않습니다.', password: '' });
      }
    } else {
      setEmail('');
      setPassword('');
      navigate('/');
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleGoToSignup = () => {
    navigate('/signup');
  };

  const kakaoLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    });
    if (error) alert(error.message);
  };

  const googleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    if (error) alert(error.message);
  };

  const naverLogin = () => {
    alert('네이버 간편 로그인/회원가입 기능 준비중입니다. 다른 간편 로그인/회원가입 서비스를 이용해주세요!');
  };

  const emailCheckFromDB = async (enteredEmail: string) => {
    const { data: profiles } = await supabase.from('profiles').select('email');

    const myEmailFromDB = profiles?.find((profile) => {
      return profile.email === enteredEmail;
    });
    const isMyEmailHere = myEmailFromDB === undefined ? false : true;
    return isMyEmailHere;
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
      <FormHeader $keyword={FORM_CONSTANT_TITLE_SIGNIN} />
      <SPartitionLine />
      <SFormContainer>
        <SForm onSubmit={handleLogin}>
          <SFormItem>
            <label htmlFor="email">이메일</label>
            <SInput type="text" id="email" placeholder="이메일을 입력하세요" name="email" value={email} onChange={handleInput} />
            {email && (
              <SignInResetButton type="button" onClick={() => setEmail('')}>
                <BsXCircleFill className="reset_signin_input_btn" />
              </SignInResetButton>
            )}
            <SPGuideMessage>{guideMessage.email && guideMessage.email}</SPGuideMessage>
          </SFormItem>

          <SFormItem>
            <label htmlFor="password">비밀번호</label>
            <SInput type="password" id="password" placeholder="비밀번호를 입력하세요" name="password" value={password} onChange={handleInput} />
            {password && (
              <SignInResetButton type="button" onClick={() => setPassword('')}>
                <BsXCircleFill className="reset_signin_input_btn" />
              </SignInResetButton>
            )}
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
          <SsnsIcon src={googleicon} $iconType={'google'} onClick={() => googleLogin()} />
          <SsnsIcon src={navericon} onClick={() => naverLogin()} />
        </SsnsIconContainer>
      </SFooter>
    </SContainer>
  );
};

export default SignInForm;

const SsnsIcon = styled.img<{ $iconType?: string }>`
  box-sizing: border-box;
  ${({ $iconType }) => {
    if ($iconType === 'google')
      return css`
        width: 57px;
        height: 57px;
        @media screen and (max-width: 420px) {
          width: 50px;
          height: 50px;
        }
      `;
    else {
      return css`
        width: 58px;
        height: 58px;
        @media screen and (max-width: 420px) {
          width: 51px;
          height: 51px;
        }
      `;
    }
  }}

  border-radius: 100%;
  cursor: pointer;
  ${({ $iconType }) => {
    if ($iconType === 'google') return 'border: 1px solid #696969';
  }}
`;

const SUnderFormButton = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  & span {
    margin-top: 14px;
    height: 30px;
    font-size: 16px;
    color: #808080;
    cursor: pointer;
  }
`;

const SButtonRelationArea = styled.div`
  position: relative;
`;

const SFooter = styled.footer`
  width: 100%;
  @media screen and (max-width: 420px) {
    height: 100px;
  }
`;

const SsnsIconContainer = styled.div`
  padding: 45px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 45px;
  @media screen and (max-width: 420px) {
    gap: 35px;
  }
`;

const SignInResetButton = styled.button`
  position: absolute;
  right: 22px;
  bottom: 37px;
  z-index: 3;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  font-size: 16px;
  cursor: pointer;
  .reset_signin_input_btn {
    fill: #cdcdcd;
  }
  &:hover {
    cursor: pointer;
    .reset_signin_input_btn {
      fill: #696969;
    }
  }
  &:focus {
    .reset_signin_input_btn {
      fill: #696969;
    }
  }
  @media screen and (max-width: 420px) {
    right: 18px;
    bottom: 37px;
    width: 15px;
    height: 15px;
    font-size: 15px;
  }
`;
