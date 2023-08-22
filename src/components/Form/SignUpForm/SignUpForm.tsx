// [ ] 이메일 중복 체크해야함.
// import { useState } from 'react';
// import { styled } from 'styled-components';
// import supabase from '../supabase';
import { useEffect, useRef, useState } from 'react';
import { FaCheck, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import supabase from '../../../supabase';

// [\w-\.]
const EMAIL_REGEX = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;

const SignUpForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  // const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current!.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd, matchPwd]);

  const handleGoToSignin = () => {
    navigate('/signin');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation1 = EMAIL_REGEX.test(email);
    const validation2 = PWD_REGEX.test(pwd);
    if (!validation1 || !validation2) {
      setErrMsg('email과 password를 다시 한 번 확인해주세요');
      return;
    }

    // TODO 아래 식이 DB에 넘기는 단계 => 아래식 거치기 전에 회원정보 입력할 수 있어야함.
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: pwd,
      // options: {
      //   data: {
      //     role: 'tutor',
      //   },
      // },
    });
    console.log('여기서 data가 보이나?', data);
    if (error) {
      console.log(error);
      alert('회원가입 실패');
    } else {
      alert('입력했던 이메일로가서 인증을 완료하면 로그인이 가능합니다! 인증기간은 10분이오니 지금바로 확인하시기 바랍니다!');
      navigate('/signin');
    }
  };

  console.log('여기여기', emailRef);
  return (
    <SContainer>
      {errMsg && <p ref={errRef}>{errMsg}</p>}
      <h1>회원가입</h1>
      <SForm onSubmit={handleSubmit}>
        {/* [x] email */}
        <label htmlFor="email">
          Email :{validEmail && <FaCheck />}
          {!validEmail && !!email && <FaTimes />}
        </label>
        <input type="text" id="email" ref={emailRef} autoComplete="off" onChange={(e) => setEmail(e.target.value)} required onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} />
        {emailFocus && email && !validEmail && (
          <p>
            <FaInfoCircle />
            이메일 형식으로 입력해주세요
          </p>
        )}

        {/* [x] password */}
        <label htmlFor="password">
          password :{validPwd && <FaCheck />}
          {!validPwd && !!pwd && <FaTimes />}
        </label>
        <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} required onFocus={() => setPwdFocus(true)} onBlur={() => setPwdFocus(false)} />
        {pwdFocus && pwd && !validPwd && (
          <p>
            <FaInfoCircle />
            대소문자, 숫자, 특수문자(!@#$%)를 모두 포함하여 6자 이상의 비밀번호를 입력해주세요
          </p>
        )}

        {/* [x] matchPassword */}
        <label htmlFor="confirm_pwd">
          Confirm password :{validMatch && matchPwd && <FaCheck />}
          {!validMatch && !!matchPwd && <FaTimes />}
        </label>
        <input type="password" id="confirm_pwd" onChange={(e) => setMatchPwd(e.target.value)} required onFocus={() => setMatchFocus(true)} onBlur={() => setMatchFocus(false)} />
        {matchFocus && matchPwd && !validMatch && (
          <p>
            <FaInfoCircle />
            처음에 입력한 비밀번호와 동일해야합니다.
          </p>
        )}
        <SButton type="submit" disabled={!validEmail || !validPwd || !validMatch ? true : false}>
          sign Up
        </SButton>
      </SForm>
      <button onClick={handleGoToSignin}>로그인으로 이동</button>
    </SContainer>
  );
};
export default SignUpForm;

const SContainer = styled.section``;
const SForm = styled.form`
  width: 400px;
  height: 500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SButton = styled.button<{ disabled: boolean }>`
  background-color: ${(props) => {
    if (props.disabled === true) return '#eee';
    else return 'white';
  }};
  border: 1px solid #eee;
`;

// const SFormContainer = styled.div`
//   width: 400px;
//   height: 500px;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

//return 위
// const [isIdentified, setIsIdentified] = useState(false);
// async function signInWithKakao() {
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'kakao',
//   })
// }
// // 알아봐야함
// const goToIdentify = () => {
//   setIsIdentified(true);
// };

// return 문 내부
// <SFormContainer>
//   <h3>회원가입</h3>
//   <input type="text" placeholder="이메일" />
//   {isIdentified ? <span>이메일인증 완료</span> : <button onClick={goToIdentify}>이메일 인증</button>}
//   <input type="password" placeholder="비밀번호" />
//   <input type="password" placeholder="비밀번호 확인" />
//   <button>reset</button>
//   <button>submit</button>
//   <button>kakao</button>
// </SFormContainer>
