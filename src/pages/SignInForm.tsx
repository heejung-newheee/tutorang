import { styled } from 'styled-components';

// type SignInFormProps = {
//   setIsSignin: (value: boolean) => void;
// };

const SignInForm = () => {
  return (
    <SContainer>
      <input type="text" placeholder="아이디 입력" />
      <input type="password" placeholder="비번 입력" />
      <p>아이디 찾기</p>
      <p>비밀번호 찾기</p>
      <button>로그인</button>
    </SContainer>
  );
};

export default SignInForm;

const SContainer = styled.div`
  width: 400px;
  height: 500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
