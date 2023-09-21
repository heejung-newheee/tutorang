import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { FORM_HEADER_TITLE } from '../../constants/formConstant';

type TypeFormHeaderProps = {
  $keyword: string;
};
const FormHeader = ({ $keyword }: TypeFormHeaderProps) => {
  const [formHeaderTitle, setFormHeaderTitle] = useState('');
  const [formHeaderSubTitle, setFormHeaderSubTitle] = useState('');
  useEffect(() => {
    for (let i = 0; i < FORM_HEADER_TITLE.length; i++) {
      if (FORM_HEADER_TITLE[i].keyword === $keyword) {
        setFormHeaderTitle(FORM_HEADER_TITLE[i].title);
        setFormHeaderSubTitle(FORM_HEADER_TITLE[i].subTitle);
      }
    }
  }, [$keyword]);

  if (formHeaderTitle === '') return <></>;
  return (
    <SHeader>
      <h1>{formHeaderTitle}</h1>
      <p>{formHeaderSubTitle}</p>
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
    font-size: 15px;
    color: #868686;
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
