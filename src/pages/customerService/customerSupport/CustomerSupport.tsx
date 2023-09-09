import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { closeModal } from '../../../redux/modules';
import { colors } from '../../../style/theme/colors';

const CustomerSupport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(closeModal());
    };
  }, []);

  return (
    <CustomerSupportContainer>
      <SearchingSpace></SearchingSpace>
      <TableContainer>
        <Table>
          <Caption>1:1 상담 목록</Caption>
          <Colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
          </Colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>답변</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </TableContainer>
      <ButtonSpace>
        <button type="button" onClick={() => navigate('/leave-inquiry')}>
          글쓰기
        </button>
      </ButtonSpace>
      <PagenationSpace>pagenation space</PagenationSpace>
    </CustomerSupportContainer>
  );
};

export default CustomerSupport;

const CustomerSupportContainer = styled.div`
  // 여기도 이렇게 해주는 게 맞나..
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SearchingSpace = styled.div`
  height: 8%;
  background-color: beige;
`;

const TableContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 76%;
  border: 2px solid #cdcdcd;
`;

const Table = styled.table`
  box-sizing: border-box;
  width: 100%;
  min-height: 80px;
`;

const Caption = styled.caption`
  display: none;
`;

const Colgroup = styled.colgroup`
  & col:nth-child(1) {
    width: 7%;
  }
  & col:nth-child(2) {
    width: 63%;
  }
  & col:nth-child(3) {
    width: 10%;
  }
  & col:nth-child(4) {
    width: 15%;
  }
  & col:nth-child(5) {
    width: 5%;
  }
`;

const ButtonSpace = styled.div`
  background-color: #cfebf7;
  height: 8%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  & button {
    width: 80px;
    height: 35px;
    border: 2px solid ${colors.primary};
    border-radius: 10%;
  }
`;
const PagenationSpace = styled.div`
  background-color: #abb5d1;

  height: 8%;
`;
