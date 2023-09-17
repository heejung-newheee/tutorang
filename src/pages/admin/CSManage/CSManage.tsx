import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
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
  const [page, setPage] = useState(1);
  const { data } = useQuery([CS_MANAGE_QUERY_KEY, page], () => getAllCs(page), { keepPreviousData: true, refetchOnWindowFocus: false });

  const moveTodetailCSQuiryPage = (inquiryId: string, inquiryitem: TypeinquiryItem) => navigate(`/admin/customer-support-manage/${inquiryId}`, { state: inquiryitem });

  useEffect(() => {}, [page]);

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
            {data.cs.map((inquiryitem) => (
              <S.TableRow key={inquiryitem.id} $isAnswered={inquiryitem.customer_support_reply.length === 0}>
                <td>{inquiryitem.created_at.split('T')[0]}</td>
                <td>
                  {inquiryitem.profiles?.avatar_url ? (
                    <S.ProfileImgFigure>
                      <S.ProfileImgSize src={inquiryitem.profiles?.avatar_url} alt="" />
                    </S.ProfileImgFigure>
                  ) : (
                    <p>'기본이미지'</p>
                  )}
                  {inquiryitem.profiles?.username || '이름 미등록'}
                </td>
                <S.TitleInquiryItem onClick={() => moveTodetailCSQuiryPage(inquiryitem.id, inquiryitem)}>{inquiryitem.title}</S.TitleInquiryItem>
                <td>{inquiryitem.customer_support_reply.length === 0 ? 'X' : 'O'}</td>
              </S.TableRow>
            ))}
          </S.TableBody>
        </Table>
      </TableContainer>
      <S.Navigation>
        <div>{`${data.totalCount - (data.currentPage - 1) * data.rowsPerPage} - ${data.totalCount - (data.currentPage - 1) * data.rowsPerPage - data.count + 1} of ${data.totalCount}`}</div>
        <button onClick={() => setPage((prev) => --prev)} disabled={!data.hasPreviousPage}>
          이전페이지
        </button>
        <span>{page}</span>
        <button onClick={() => setPage((prev) => ++prev)} disabled={!data.hasNextPage}>
          다음페이지
        </button>
      </S.Navigation>
    </Layout>
  );
};

export default CSManage;
