import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { CS_HEADER_TITLE } from '../../constants/headerTitle.constant';

type TypeCSHeaderProps = {
  headerType: string;
};

const CSHeader: React.FC<TypeCSHeaderProps> = ({ headerType }) => {
  const param = useLocation().pathname.split('/');
  const [headerTitle, setHeaderTitle] = useState('');
  const [description, setDiscription] = useState('');

  useEffect(() => {
    // '/'뒤에 첫번째로 오는 인자 기준으로 headerTitle.constant > HEADER_TITLE categoryKeyword 설정하시면 됩니다.
    let comparingAgent = param[1];
    if (param[3]) comparingAgent = param[2];
    const options = CS_HEADER_TITLE[headerType];
    for (let i = 0; i < options.length; i++) {
      if (comparingAgent.includes(options[i].categoryKeyword)) {
        setHeaderTitle(options[i].title);
        setDiscription(options[i].description);
        return;
      }
    }
  }, [param]);
  if (headerTitle === '' || description === '') return <></>;
  return (
    <SHeader $headerType={headerType}>
      <h1>{headerTitle}</h1>
      <p>{description}</p>
    </SHeader>
  );
};

export default CSHeader;

const SHeader = styled.header<{ $headerType?: string }>`
  width: 100%;
  max-width: 1140px;
  height: 190px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ $headerType }) => {
    if ($headerType === 'cs') {
      return '30px 30px 0px';
    } else {
      return '30px';
    }
  }};
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
