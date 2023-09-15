import { useEffect, useState } from 'react';
import { BsXCircleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { googleicon, kakaotalk } from '../../../assets';
import { SButton, SContainer, SForm, SFormContainer, SFormItem, SInput, SPGuideMessage, SPartitionLine } from '../../../components/Form/AuthForm.styled';
import FormHeader from '../../../components/Form/FormHeader';
import '../../../components/Form/icon.css';
import '../../../components/Form/inputBackgroundSetting.css';
import { EMAIL_REGEX, FORM_CONSTANT_TITLE_SIGNIN } from '../../../constants/formConstant';
import { AppDispatch } from '../../../redux/config/configStore';
import { displayToastAsync } from '../../../redux/modules';
import supabase from '../../../supabase';
import * as S from './SignInForm.style';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationCheck, setValidationCheck] = useState(false);
  const [guideMessage, setGuideMessage] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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
    if (error) console.log(error.message);
    if (error) dispatch(displayToastAsync({ id: Date.now(), type: 'warning', message: error.message }));
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
    if (error) console.log(error.message);
    if (error) dispatch(displayToastAsync({ id: Date.now(), type: 'warning', message: error.message }));
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
              <S.SignInResetButton type="button" onClick={() => setEmail('')}>
                <BsXCircleFill className="reset_signin_input_btn" />
              </S.SignInResetButton>
            )}
            <SPGuideMessage>{guideMessage.email && guideMessage.email}</SPGuideMessage>
          </SFormItem>

          <SFormItem>
            <label htmlFor="password">비밀번호</label>
            <SInput type="password" id="password" placeholder="비밀번호를 입력하세요" name="password" value={password} onChange={handleInput} />
            {password && (
              <S.SignInResetButton type="button" onClick={() => setPassword('')}>
                <BsXCircleFill className="reset_signin_input_btn" />
              </S.SignInResetButton>
            )}
            <SPGuideMessage>{guideMessage.password && guideMessage.password}</SPGuideMessage>
          </SFormItem>

          <S.ButtonRelationArea>
            <SButton type="submit" disabled={!validationCheck}>
              로그인
            </SButton>
            <S.UnderFormButton>
              <span onClick={handleGoToSignup}>회원가입</span>
            </S.UnderFormButton>
          </S.ButtonRelationArea>
        </SForm>
      </SFormContainer>

      <SPartitionLine>
        <p>
          <span>간편로그인/회원가입으로 시작하기</span>
        </p>
      </SPartitionLine>
      <S.Footer>
        <S.SnsIconContainer>
          <S.SnsIcon src={kakaotalk} onClick={() => kakaoLogin()} alt="kakao login" />
          <S.SnsIcon src={googleicon} $iconType={true} onClick={() => googleLogin()} alt="google login" />
        </S.SnsIconContainer>
      </S.Footer>
    </SContainer>
  );
};

export default SignInForm;
