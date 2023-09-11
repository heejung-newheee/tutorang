import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Layout = styled.div`
  font-size: 18px;
  background-color: #fff;
  border-radius: 20px;
  margin: 24px 20px;
  min-width: 700px;
  max-width: 1200px;
`;

export const Title = styled.h2`
  font-size: 1em;
  font-weight: 600;
`;

export const FilterContainer = styled.div`
  padding: 1.5em;
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 1em;
`;

export const FormInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const DateContainer = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;
`;

const CommonStyle = `font-size: 1em;
padding: 0.4em 0.8em;
border-radius: 6px;
border: 1px solid #dcdcdc;`;

export const Select = styled.select`
  ${CommonStyle}
`;

export const Input = styled.input`
  ${CommonStyle}
`;

export const Button = styled.button`
  ${CommonStyle}
  border: none;
  background-color: royalblue;
  color: #fff;
`;

export const TableContainer = styled.div`
  overflow: auto;
`;

export const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  min-width: 800px;
`;

export const TableHead = styled.thead`
  color: #637381;

  & > tr > th {
    padding: 1em 0.5em;
    text-align: left;
  }

  & > tr > th:nth-child(1) {
    width: 100px;
  }
  & > tr > th:nth-child(2) {
    width: 100px;
  }
  & > tr > th:nth-child(3) {
    width: 120px;
  }

  & > tr > th:nth-child(5) {
    width: 250px;
  }
  & > tr > th:nth-child(6) {
    width: 90px;
  }
`;

export const TableBody = styled.tbody`
  font-size: 0.7777777778em;
  & > tr > td {
    padding: 1em;
    border-bottom: 1px solid #f1f3f4;
    white-space: nowrap;
    max-width: 250px;
  }
  & > tr > td:nth-child(4) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & > tr > td:nth-child(5) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const SortButton = styled.button`
  display: flex;
  align-items: flex-end;
  font-size: 1em;
  font-weight: 600;
  color: #46515b;
  & > svg {
    position: relative;
    bottom: 3px;
  }
`;

export const Navigation = styled.nav`
  padding: 1em;
  display: flex;
  justify-content: flex-end;
  gap: 1em;
`;

export const BoardLink = styled(Link)`
  font-weight: 600;
  color: #000;
  &:hover {
    text-decoration: underline;
  }
`;
