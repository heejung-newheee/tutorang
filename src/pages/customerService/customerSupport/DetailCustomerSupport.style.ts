import { styled } from 'styled-components';

export const DetailCustomerSupportContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const TableContainer = styled.div<{ $role: string }>`
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  @media screen and (max-width: 420px) {
    font-size: 15px;
  }
  @media screen and (max-width: 300px) {
    font-size: 13px;
  }
`;

export const Table = styled.table`
  box-sizing: border-box;
  width: 100%;
  min-height: 80px;
  border-left: 1px solid #696969;
  border-top: 1px solid #696969;
  & th {
    padding: 10px;
    background-color: #eee;
    border-right: 1px solid #696969;
    border-bottom: 1px solid #696969;
    vertical-align: middle;
  }
  & td {
    padding: 10px;
    border-right: 1px solid #696969;
    border-bottom: 1px solid #696969;
  }
`;

export const Caption = styled.caption`
  display: none;
`;

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
  & col:nth-child(3) {
    display: table-column;
    width: 130px;
  }
  & col:nth-child(4) {
    display: table-column;
    width: auto;
  }
  @media screen and (max-width: 420px) {
    & col:nth-child(1) {
      display: table-column;
      width: 90px;
    }
    & col:nth-child(3) {
      display: table-column;
      width: 90px;
    }
  }
  @media screen and (max-width: 300px) {
    & col:nth-child(1) {
      display: table-column;
      width: 70px;
    }
    & col:nth-child(3) {
      display: table-column;
      width: 70px;
    }
  }
`;

export const ContentArea = styled.div`
  padding: 20px 10px;
  & img {
    width: 300px;
  }
  @media screen and (max-width: 420px) {
    & img {
      max-width: 240px;
    }
  }
`;

export const ButtonsWrapper = styled.div`
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & > div > button {
    margin-left: 10px;
  }
`;

export const ReplacementContainer = styled.div`
  background-color: #eee;
  width: 100%;
  padding: 10px 20px;
`;
