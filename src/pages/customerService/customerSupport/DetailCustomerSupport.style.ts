import { styled } from 'styled-components';

export const Caption = styled.caption`
  display: none;
`;

export const Colgroup = styled.colgroup`
  display: table-column-group;
  & col:nth-child(1) {
    display: table-column;
    width: 100px;
  }
  & col:nth-child(2) {
    display: table-column;
    width: auto;
  }
  & col:nth-child(3) {
    display: table-column;
    width: 100px;
  }
  & col:nth-child(4) {
    display: table-column;
    width: auto;
  }
  @media screen and (max-width: 420px) {
    & col:nth-child(1) {
      display: table-column;
      width: 55px;
    }
    & col:nth-child(3) {
      display: table-column;
      width: 55px;
    }
  }
  @media screen and (max-width: 300px) {
    & col:nth-child(1) {
      display: table-column;
      width: 50px;
    }
    & col:nth-child(3) {
      display: table-column;
      width: 50px;
    }
  }
`;

export const Th = styled.th`
  font-weight: 600;
`;

export const ReplacementContainer = styled.div`
  background-color: #eee;
  width: 100%;
  padding: 10px 20px;
`;
