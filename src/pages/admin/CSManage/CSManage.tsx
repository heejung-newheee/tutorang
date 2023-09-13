import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { CS_MANAGE_QUERY_KEY, getAllCs } from '../../../api/customerSupportReply';
import { FilterContainer, Layout, Table, TableContainer, Title } from '../boardManage/BoardManage.styled';
import * as S from './CSManage.style';

type TypeinquiryItem = {
  content: string | null;
  created_at: string;
  file1: string | null;
  id: string;
  title: string | null;
  user_id: string | null;
  profiles: {
    age: number | null;
    avatar_url: string | null;
    basic_authority: boolean;
    birth: string | null;
    deleted_at: string | null;
    email: string | null;
    gender: string | null;
    id: string;
    location1_gugun: string | null;
    location1_sido: string | null;
    location2_gugun: string | null;
    location2_sido: string | null;
    role: string | null;
    updated_at: string | null;
    username: string | null;
  } | null;
};

const CSManage = () => {
  const navigate = useNavigate();
  const { data } = useQuery([CS_MANAGE_QUERY_KEY], getAllCs);

  const moveTodetailCSQuiryPage = (inquiryId: string, inquiryitem: TypeinquiryItem) => navigate(`/admin/customer-support-manage/${inquiryId}`, { state: inquiryitem });
  if (!data) return <div></div>;
  return (
    <Layout>
      <FilterContainer>
        <Title>1:1 문의 관리</Title>
      </FilterContainer>
      <TableContainer>
        <Table>
          <S.TableHead>
            <tr>
              <th>날짜</th>
              <th>이름</th>
              <th>제목</th>
              <th>답변여부</th>
            </tr>
          </S.TableHead>
          <S.TableBody>
            {data.map((inquiryitem) => (
              <tr key={Math.random()}>
                <td>{inquiryitem.created_at.split('T')[0]}</td>
                <td>
                  {inquiryitem.profiles?.avatar_url ? <S.ProfileImgSize src={inquiryitem.profiles?.avatar_url} alt="" /> : <p>'기본이미지'</p>}
                  {inquiryitem.profiles?.username || '이름 미등록'}
                </td>
                <S.TitleInquiryItem onClick={() => moveTodetailCSQuiryPage(inquiryitem.id, inquiryitem)}>{inquiryitem.title}</S.TitleInquiryItem>
                <td>{inquiryitem.customer_support_reply.length === 0 ? 'X' : 'O'}</td>
              </tr>
            ))}
          </S.TableBody>
        </Table>
      </TableContainer>
      <S.SectionFalseReplied></S.SectionFalseReplied>
    </Layout>
  );
};

export default CSManage;
