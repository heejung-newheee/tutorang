import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CUSTOMER_SUPPORT_QUERY_KEY, getAllInquiry } from '../../../api/customerSupport';
import { RootState } from '../../../redux/config/configStore';
import * as C from '../CommonCustomerService.style';
import * as S from './CustomerSupport.style';

const CustomerSupport = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const userId = user?.id;
  const { data } = useQuery([CUSTOMER_SUPPORT_QUERY_KEY], () => getAllInquiry(userId as string), { enabled: !!userId });

  if (!user) return <div></div>;
  if (!data) return <div></div>;
  return (
    <C.OutermostContainer>
      <C.TableContainer>
        <C.Table>
          <C.Caption>1:1 상담 목록</C.Caption>
          <S.Colgroup>
            <col />
            <col />
            <col />
            <col />
          </S.Colgroup>
          <C.Thead>
            <tr>
              <th>NO.</th>
              <th>제목</th>
              <th>작성일</th>
              <th>답변</th>
            </tr>
          </C.Thead>
          <C.Tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  <C.ParagraghCSGuide>첫 문의를 등록해보세요</C.ParagraghCSGuide>
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/customer-service/customer-support/${item.id}`}>{item.title}</Link>
                  </td>

                  <td>{item.created_at.split('T')[0]}</td>
                  <td>{item.customer_support_reply.length === 0 ? 'X' : 'O'}</td>
                </tr>
              ))
            )}
          </C.Tbody>
        </C.Table>
      </C.TableContainer>
      <S.ButtonSpace>
        <C.ButtonCS to={'/leave-inquiry'}>글쓰기</C.ButtonCS>
      </S.ButtonSpace>
    </C.OutermostContainer>
  );
};

export default CustomerSupport;
