import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { ONE_ANNOUNCEMENT_QUERY_KEY, getOneAnnouncement } from '../../../api/announcements';
import * as C from './../CommonCustomerService.style';
import * as S from './DetailAnnouncement.style';

const DetailAnnouncement = () => {
  const announcementId = useLocation().pathname.split('/')[3];
  const { data } = useQuery([ONE_ANNOUNCEMENT_QUERY_KEY, announcementId], () => getOneAnnouncement(announcementId), { enabled: !!announcementId });

  if (!data) return <div></div>;
  return (
    <C.OutermostContainer>
      <C.TableContainer>
        <C.Tbody>
          <C.Caption>공지사항 상세게시물</C.Caption>
          <S.Colgroup>
            <col />
            <col />
          </S.Colgroup>
          <C.Tbody>
            <tr>
              <th>제목</th>
              <td>{data.title}</td>
            </tr>
            <tr>
              <th>작성자</th>
              <td>튜터랑</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <S.ContentArea>
                  <div dangerouslySetInnerHTML={{ __html: data.content || '' }}></div>
                </S.ContentArea>
              </td>
            </tr>
          </C.Tbody>
        </C.Tbody>
      </C.TableContainer>
      <div>
        <C.ButtonCS to={'/customer-service/announcements'}>목록</C.ButtonCS>
      </div>
    </C.OutermostContainer>
  );
};

export default DetailAnnouncement;
