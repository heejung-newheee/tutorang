import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { colors } from '../../../style/theme/colors';

const DetailCustomerSupport = () => {
  const navigate = useNavigate();
  const pathdata = useLocation();
  const inquiryData = pathdata.state;
  console.log('location', location);
  return (
    <DetailCustomerSupportContainer>
      <TableContainer $role={'customer'}>
        <Table>
          <Caption>1:1 상담 목록 상세보기</Caption>
          <Colgroup>
            <col />
            <col />
            <col />
            <col />
          </Colgroup>
          <tbody>
            <tr>
              <th>제목</th>
              <td colSpan={3}>{inquiryData.title}</td>
            </tr>
            <tr>
              <th>작성자</th>
              <td>{inquiryData.profiles.inquiryUsername}</td>
              <th>답변여부</th>
              <td>{inquiryData.isReplied ? 'O' : 'X'}</td>
            </tr>
            <tr>
              <th>문의날짜</th>
              <td colSpan={3}>{inquiryData.created_at.split('T')[0]}</td>
            </tr>
            <tr>
              <td colSpan={4}>
                <ContentArea>
                  <div dangerouslySetInnerHTML={{ __html: inquiryData.content }}></div>
                </ContentArea>
              </td>
            </tr>
          </tbody>
        </Table>
      </TableContainer>

      <TableContainer $role={'$administrator'}>
        Table
        <p>빠른 시간 내에 답변드리겠습니다! 잠시만 기다려 주세요!</p>
      </TableContainer>

      <ButtonsWrapper>
        <button onClick={() => navigate('/customer-service/customer-support')}>목록</button>
        <div>
          {inquiryData.isReplied === false && (
            <>
              <button>삭제</button>
              <button>수정</button>
            </>
          )}
        </div>
      </ButtonsWrapper>
    </DetailCustomerSupportContainer>
  );
};

export default DetailCustomerSupport;

const DetailCustomerSupportContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// 임시

const TableContainer = styled.div<{ $role: string }>`
  box-sizing: border-box;
  width: 100%;
  /* height: 100%;
  max-height: ${({ $role }) => {
    if ($role === 'customer') return '80%';
    else return '20%';
  }}; */
  padding: 20px;
`;

const Table = styled.table`
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

const Caption = styled.caption`
  display: none;
`;

const Colgroup = styled.colgroup`
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
`;

const ContentArea = styled.div`
  padding: 20px 10px;
  & img {
    width: 300px;
  }
`;

const ButtonsWrapper = styled.div`
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
