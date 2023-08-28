import { useState } from 'react';
import { styled } from 'styled-components';
import { SignUpForm } from '../..';
import ServiceAgreement from './ServiceAgreement';

const SignUpWrapBox = () => {
  const [formComponent, setFormComponent] = useState('agreement');
  return (
    <SContainer>
      <SHeader>
        <h1>회원가입</h1>
      </SHeader>
      {formComponent === 'agreement' && <ServiceAgreement setFormComponent={setFormComponent} />}
      {formComponent === 'infoForSignup' && <SignUpForm setFormComponent={setFormComponent} />}
    </SContainer>
  );
};

export default SignUpWrapBox;

const SContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SHeader = styled.header`
  background-color: red;
  width: 100%;
`;
