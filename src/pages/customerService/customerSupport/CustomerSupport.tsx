import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { CUSTOMER_SUPPORT_QUERY_KEY, getAllInquiry } from '../../../api/customerSupport';
import { RootState } from '../../../redux/config/configStore';
import { colors } from '../../../style/theme/colors';

const CustomerSupport = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const userId = user?.id;
  // const inquiryIdFromPath = location.pathname.split(':/')[1];
  const { data } = useQuery([CUSTOMER_SUPPORT_QUERY_KEY], () => getAllInquiry(userId as string), { enabled: !!userId });
  console.log('데타', data);

  if (!user) return <div></div>;
  if (!data) return <div></div>;
  return (
    <CustomerSupportContainer>
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
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td
                  onClick={() => {
                    navigate(`/customer-service/customer-support/${item.id}`, { state: item });
                  }}
                >
                  {item.title}
                </td>
                <td>{item.profiles!.inquiryUsername}</td>
                <td>{item.created_at.split('T')[0]}</td>
                <td>{item.isReplied ? 'O' : 'X'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      <ButtonSpace>
        <button type="button" onClick={() => navigate('/leave-inquiry')}>
          글쓰기
        </button>
      </ButtonSpace>
      <PagenationSpace>pagenation space</PagenationSpace>
      <SearchingSpace></SearchingSpace>
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

const TableContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
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
  height: 60px;
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

  height: 60px;
`;

const SearchingSpace = styled.div`
  height: 70px;
  background-color: beige;
`;
