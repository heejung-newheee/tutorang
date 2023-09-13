import { styled } from 'styled-components';
import { colors } from '../../style/theme/colors';

// export const ButtonCS = styled.button`
//   border: 2px solid #cdcdcd;
//   border-radius: 3px;
//   padding: 7px 25px;
//   &:hover {
//     border: 2px solid ${colors.primary};
//     background-color: #fe902f2c;
//   }
// `;

export const ButtonCS = styled.button`
  /* border: 2px solid #cdcdcd; */
  background-color: ${colors.primary};
  color: #fff;
  border-radius: 3px;
  padding: 10px 25px;
  font-size: 16px;
  @media screen and (max-width: 420px) {
    padding: 7px 20px;
    font-size: 12px;
    margin-right: 12px;
  }
`;

export const OutermostContainer = styled.div`
  // 여기도 이렇게 해주는 게 맞나..
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TableContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

export const Thead = styled.thead`
  & tr {
    border-bottom: 1px solid #eee;
  }
  & th {
    padding: 20px 0px;
  }
`;

export const Tbody = styled.tbody`
  width: 100%;
  & tr {
    border-bottom: 1px solid #eee;
  }
  & td {
    padding: 15px 0px;
  }
  & td:nth-child(2) {
    text-align: start;
    padding-left: 5px;
  }
  @media screen and (max-width: 420px) {
    & td:nth-child(2) {
      padding-left: 2px;
    }
  }
`;

export const Caption = styled.caption`
  display: none;
`;

export const SpanNavTitle = styled.span`
  cursor: pointer;
`;

export const PaginationSpace = styled.div`
  background-color: #abb5d1;
  height: 60px;
  margin-top: 10px;
`;

export const ParagraghCSGuide = styled.p`
  color: #cdcdcd;
`;

export const Table = styled.table`
  box-sizing: border-box;
  width: 100%;
  min-height: 80px;
  text-align: center;
  font-size: 16px;
  @media screen and (max-width: 420px) {
    font-size: 12px;
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
