import { styled } from 'styled-components';

export const Colgroup = styled.colgroup`
  display: table-column-group;
  & col:nth-child(1) {
    display: table-column;
    width: 120px;
  }
  & col:nth-child(2) {
    display: table-column;
    width: auto;
  }
  @media screen and (max-width: 420px) {
    & col:nth-child(1) {
      display: table-column;
      width: 70px;
    }
  }
  @media screen and (max-width: 300px) {
    & col:nth-child(1) {
      display: table-column;
      width: 70px;
    }
  }
`;

export const Tbody = styled.tbody`
  width: 100%;
  & tr {
    border-bottom: 1px solid #eee;
  }
  & th {
    font-weight: 600;
  }
  & td:nth-child(1),
  td:nth-child(2) {
    padding: 17px 20px;
    text-align: start;
  }
  & td:nth-child(3) {
    padding: 17px 20px;
  }
  @media screen and (max-width: 420px) {
    & td:nth-child(2) {
      padding-left: 2px;
    }
  }
`;

export const ContentArea = styled.div`
  padding: 20px 10px;
  width: 100%;
  text-align: center;
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
