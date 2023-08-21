// import { fetchCity } from '../api/city';

import { styled } from 'styled-components';

// const cityData = fetchCity();
// console.log(cityData);

const SignUpForm = () => {
  return (
    <SFormContainer>
      <input type="text" placeholder="아이디" />
      <input type="text" placeholder="인증번호" />
      <input type="password" placeholder="비밀번호" />
      <input type="password" placeholder="비밀번호 확인" />
      <button>reset</button>
      <button>submit</button>
    </SFormContainer>
  );
};

export default SignUpForm;

const SFormContainer = styled.div`
  width: 400px;
  height: 500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
