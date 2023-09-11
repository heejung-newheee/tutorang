import { styled } from 'styled-components';
import { colors } from '../../../style/theme/colors';

export const DetailCustomerSupportContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* gap: 5px; */
`;

// 임시

export const TableContainer = styled.div<{ $role: string }>`
  box-sizing: border-box;
  width: 100%;
  /* height: 100%;
  max-height: ${({ $role }) => {
    if ($role === 'customer') return '80%';
    else return '20%';
  }}; */
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
    display: flex;
    justify-content: start;
    padding: 10px;
    background-color: #eee;
    border-right: 1px solid #696969;
    border-bottom: 1px solid #696969;
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
`;

export const ButtonsWrapper = styled.div`
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  button {
    border: 2px solid #cdcdcd;
    border-radius: 3px;
    padding: 4px 25px;
  }
  button:hover {
    border: 2px solid ${colors.primary};
    background-color: #fe902f2c;
  }
  & > div > button {
    margin-left: 10px;
  }
`;

export const ReplacementContainer = styled.div`
  background-color: #eee;
  width: 100%;
  padding: 10px 20px;
`;
