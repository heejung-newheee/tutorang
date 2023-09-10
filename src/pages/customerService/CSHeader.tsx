// [ ] 왜 안되는거지..

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { CS_HEADER_TITLE } from '../../constants/cs.constant';

const CSHeader = () => {
  const param = useLocation().pathname;
  console.log(param);
  const [CSheaderTitle, setCSHeaderTitle] = useState('');
  useEffect(() => {
    for (let i = 0; i < CS_HEADER_TITLE.length; i++) {
      if (param.includes(CS_HEADER_TITLE[i].keyword)) return setCSHeaderTitle(CS_HEADER_TITLE[i].title);
    }
  }, [param]);
  if (CSheaderTitle === '') return <></>;
  return (
    <SHeader>
      <h1>{CSheaderTitle}</h1>
      <p>튜터랑의 관련 문의사항을 이야기 해주세요</p>
    </SHeader>
  );
};

export default CSHeader;

const SHeader = styled.header`
  width: 100%;
  max-width: 1140px;
  height: 190px;
  margin: 0 auto;

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
