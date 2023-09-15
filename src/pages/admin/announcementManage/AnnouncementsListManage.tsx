import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { LiaArrowDownSolid, LiaArrowUpSolid } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';
import { ANNOUNCEMENTS_QUERY_KEY, getAllAnnouncements } from '../../../api/announcements';
import { FilterContainer, Layout, SortButton, Table, TableContainer, Title } from '../boardManage/BoardManage.styled';
import * as S from './AnnouncementsListManage.style';
import * as C from './ManageAnnouncementCommon.style';
const AnnouncementsListManage = () => {
  const navigate = useNavigate();
  const { data } = useQuery([ANNOUNCEMENTS_QUERY_KEY], getAllAnnouncements);

  const moveToPageForCreateAnnouncementForm = () => navigate('/admin-form/create-announcement');
  const [sort, setSort] = useState({
    date: 'asc',
  });
  return (
    <Layout>
      <FilterContainer>
        <Title>공지사항 관리</Title>
        <C.ButtonWrap>
          <C.ButtonAnnouncement onClick={moveToPageForCreateAnnouncementForm}>새공지 작성</C.ButtonAnnouncement>
        </C.ButtonWrap>
      </FilterContainer>
      <TableContainer>
        <Table>
          <S.TableHead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">
                <SortButton onClick={() => setSort((prev) => ({ ...prev, date: prev.date === 'asc' ? 'desc' : 'asc' }))}>
                  날짜
                  {sort.date === 'asc' ? <LiaArrowUpSolid size={18} /> : <LiaArrowDownSolid size={18} />}
                </SortButton>
              </th>
              <th scope="col">제목</th>
            </tr>
          </S.TableHead>
          <S.TableBody>
            {data?.map((announcementItem) => (
              <tr key={announcementItem.id}>
                <td>넘버</td>
                <td>{announcementItem.created_at.slice(0, 10)}</td>
                <td key={announcementItem.id}>
                  <Link to={`/admin/announcements-manage/${announcementItem.id}`}>{announcementItem.title}</Link>
                </td>
              </tr>
            ))}
          </S.TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default AnnouncementsListManage;
