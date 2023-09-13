import { styled } from 'styled-components';

export const Colgroup = styled.colgroup`
  display: table-column-group;
  & col:nth-child(1) {
    display: table-column;
    width: 130px;
  }
  & col:nth-child(2) {
    display: table-column;
    width: auto;
  }
  @media screen and (max-width: 420px) {
    & col:nth-child(1) {
      display: table-column;
      width: 90px;
    }
  }
  @media screen and (max-width: 300px) {
    & col:nth-child(1) {
      display: table-column;
      width: 70px;
    }
  }
`;

export const ContentArea = styled.div`
  padding: 20px 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & img {
    width: 300px;
  }
  @media screen and (max-width: 420px) {
    & img {
      max-width: 240px;
    }
  }
`;

export const ReplacementContainer = styled.div`
  background-color: #eee;
  width: 100%;
  padding: 10px 20px;
`;
