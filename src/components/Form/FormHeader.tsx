import { styled } from 'styled-components';

const FormHeader = () => {
  return (
    <SHeader>
      <h1>로그인</h1>
      <p>쉽고 빠르게 튜터를 만나보는 1:1 매칭 서비스 튜터랑</p>
    </SHeader>
  );
};

export default FormHeader;

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
