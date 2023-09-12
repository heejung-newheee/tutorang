import styled from 'styled-components';

export const TableHead = styled.thead`
  color: #637381;

  & > tr > th {
    background-color: #f4f6f8;
    padding: 1em 0.5em;
    text-align: center;
    font-size: 15px;
  }

  & > tr > th:nth-child(1) {
    width: 5%;
  }
  & > tr > th:nth-child(2) {
    width: 15%;
  }
`;

export const TableBody = styled.tbody`
  font-size: 0.7777777778em;
  & > tr > td {
    padding: 1em;
    border-bottom: 1px solid #f1f3f4;
    white-space: nowrap;
    max-width: 250px;
    text-align: center;
  }
  & > tr > td:nth-child(3) {
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }
  & > tr > td:nth-child(5) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
