import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { FORM_HEADER_TITLE } from './formConstant';

type TypeFormHeaderProps = {
  $keyword: string;
};

const FormHeader: React.FC<TypeFormHeaderProps> = ({ $keyword }) => {
  const [formHeaderTitle, setFormHeaderTitle] = useState('');
  useEffect(() => {
    for (let i = 0; i < FORM_HEADER_TITLE.length; i++) {
      if (FORM_HEADER_TITLE[i].keyword === $keyword) return setFormHeaderTitle(FORM_HEADER_TITLE[i].title);
    }
  }, []);
  if (formHeaderTitle === '') return <></>;
  return (
    <SHeader>
      <h1>{formHeaderTitle}</h1>
      <p>쉽고 빠르게 튜터를 만나보는 1:1 매칭 서비스 튜터랑</p>
    </SHeader>
  );
};

export default FormHeader;

const SHeader = styled.header`
  width: 100%;
  height: 155px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 10px;
  & h1 {
    font-size: 30px;
    font-weight: 600;
  }
  & p {
    font-size: 17px;
    color: #4a4a4a;
  }
  @media screen and (max-width: 420px) {
    height: 130px;
    & h1 {
      font-size: 25px;
      font-weight: 500;
    }
    & p {
      font-size: 14px;
      color: #4a4a4a;
    }
  }
`;
