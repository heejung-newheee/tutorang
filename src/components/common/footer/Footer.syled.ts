import { styled } from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #f9f9f9;
  padding: 10px;
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
  justify-content: space-between;
  font-size: 14px;
  color: #444;
  > div {
    width: 25%;
    &:first-child {
      width: 50%;
      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }
  }
`;
export const CompanyInfo = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 50px;
  @media screen and (max-width: 768px) {
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
`;

export const Call = styled.div`
  font-size: 22px;
  font-weight: bold;
  line-height: 1;
`;

export const FootLink = styled.div`
  p {
    font-weight: bold;
    margin-bottom: 20px;
  }
  li {
    line-height: 2;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
