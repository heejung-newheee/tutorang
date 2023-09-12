import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { ONE_ANNOUNCEMENT_QUERY_KEY, getOneAnnouncement } from '../../../api/announcements';
import * as C from './CustomerAnnouncementCommom.style';

const DetailAnnouncement = () => {
  const navigate = useNavigate();
  const announcementId = useLocation().pathname.split('/')[3];
  console.log(announcementId);
  // const announcementId = pathdata.state.id;
  const { data } = useQuery([ONE_ANNOUNCEMENT_QUERY_KEY, announcementId], () => getOneAnnouncement(announcementId), { enabled: !!announcementId });
  console.log(data);

  const moveToPageForAnnouncementListManage = () => navigate('/customer-service/announcements');

  if (!data) return <div></div>;
  return (
    <div>
      AnnouncementDetailManage
      <div>
        <div dangerouslySetInnerHTML={{ __html: data.content || '' }}></div>
      </div>
      <C.ButtonAnnouncement onClick={moveToPageForAnnouncementListManage}>목록</C.ButtonAnnouncement>
    </div>
  );
};

export default DetailAnnouncement;
