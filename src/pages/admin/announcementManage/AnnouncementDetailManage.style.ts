import styled from 'styled-components';

export const NoticeContent = styled.div`
  margin: 30px 0;
  border-top: solid 1px #ddd;
  border-bottom: solid 1px #ddd;
  padding: 30px 15px;
  font-size: 14px;
  text-align: center;
  & img {
    width: 300px;
  }
`;

export const TextNoticeDate = styled.p`
  text-align: end;
`;

export const ContentTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;
