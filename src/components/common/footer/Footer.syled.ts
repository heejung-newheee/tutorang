import { styled } from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #f9f9f9;
  padding: 10px;
  margin-top: 90px;
  @media screen and (max-width: 768px) {
    margin-top: 30px;
  }
`;
export const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
export const FooterWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 14px;
  color: #444;
  > div {
    width: 50%;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  @media screen and (max-width: 768px) {
    p {
      text-align: center;
      margin-bottom: 7px;
    }
  }
`;
export const FootLink = styled.div`
  display: flex;
  justify-content: end;
  .github {
    font-weight: bold;
  }
  a:not(:last-child) {
    margin-right: 10px;
  }
  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;
