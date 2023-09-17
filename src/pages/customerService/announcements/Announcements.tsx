import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ANNOUNCEMENTS_QUERY_KEY, getAllAnnouncements } from '../../../api/announcements';
import * as C from './../CommonCustomerService.style';
import * as S from './Announcements.style';

const Announcements = () => {
  const { data } = useQuery([ANNOUNCEMENTS_QUERY_KEY], getAllAnnouncements);

  if (!data) return <div></div>;
  return (
    <C.OutermostContainer>
      <C.TableContainer>
        <C.Table>
          <C.Caption>공지사항</C.Caption>
          <S.Colgroup>
            <col />
            <col />
            <col />
          </S.Colgroup>
          <C.Thead>
            <tr>
              <th>NO.</th>
              <th>제목</th>
              <th>작성일</th>
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
              data.map((announcementItem, index) => (
                <tr key={announcementItem.id}>
                  <td>{data.length - index}</td>
                  <td>
                    <Link to={`/customer-service/announcements/${announcementItem.id}`}>{announcementItem.title}</Link>
                  </td>

                  <td>{announcementItem.created_at.split('T')[0]}</td>
                </tr>
              ))
            )}
          </C.Tbody>
        </C.Table>
      </C.TableContainer>
    </C.OutermostContainer>
  );
};

export default Announcements;
