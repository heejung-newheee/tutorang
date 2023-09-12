import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { ONE_ANNOUNCEMENT_QUERY_KEY, getOneAnnouncement } from '../../../api/announcements';
import * as C from './../CommonCustomerService.style';
import * as S from './DetailAnnouncement.style';

const DetailAnnouncement = () => {
  const navigate = useNavigate();
  const announcementId = useLocation().pathname.split('/')[3];
  console.log(announcementId);
  // const announcementId = pathdata.state.id;
  const { data } = useQuery([ONE_ANNOUNCEMENT_QUERY_KEY, announcementId], () => getOneAnnouncement(announcementId), { enabled: !!announcementId });
  console.log('하잉', data);

  const moveToPageForAnnouncementListManage = () => navigate('/customer-service/announcements');

  if (!data) return <div></div>;
  return (
    <C.OutermostContainer>
      <C.TableContainer>
        <C.Table>
          <C.Caption>공지사항 상세게시물</C.Caption>
          <S.Colgroup>
            <col />
            <col />
          </S.Colgroup>
          <S.Tbody>
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
                <S.ContentArea dangerouslySetInnerHTML={{ __html: data.content || '' }}></S.ContentArea>
              </td>
            </tr>
          </S.Tbody>
        </C.Table>
      </C.TableContainer>
      <C.PartitionLine />
      <C.ButtonsWrapper>
        <C.ButtonCS onClick={moveToPageForAnnouncementListManage}>목록</C.ButtonCS>
      </C.ButtonsWrapper>
    </C.OutermostContainer>
    // <div>
    //   AnnouncementDetailManage
    //   <div>
    //     <div dangerouslySetInnerHTML={{ __html: data.content || '' }}></div>
    //   </div>
    // </div>
  );
};

export default DetailAnnouncement;
