import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { ANNOUNCEMENTS_QUERY_KEY, ONE_ANNOUNCEMENT_QUERY_KEY, deleteAnnouncement, getOneAnnouncement } from '../../../api/announcements';
import * as C from './ManageAnnouncementCommon.style';

const AnnouncementDetailManage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const announcementId = useLocation().pathname.split('/')[3];
  console.log(announcementId);
  // const announcementId = pathdata.state.id;
  const { data } = useQuery([ONE_ANNOUNCEMENT_QUERY_KEY, announcementId], () => getOneAnnouncement(announcementId), { enabled: !!announcementId });
  console.log(data);

  const deleteAnnouncementMutation = useMutation(async (announcementId: string) => deleteAnnouncement(announcementId), {
    onSuccess: () => {
      queryClient.invalidateQueries([ANNOUNCEMENTS_QUERY_KEY]);
      queryClient.invalidateQueries([ONE_ANNOUNCEMENT_QUERY_KEY]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const moveToPageForAnnouncementListManage = () => navigate('/admin/announcements-manage');

  const moveToPageForEditAnnouncementForm = () => {
    navigate(`/admin-form/edit-announcement/${announcementId}`, { state: data });
  };

  const handleDeleteAnnouncement = async () => {
    const wannaDelete = window.confirm('해당공지를 삭제하시겠습니까?');
    if (!wannaDelete) return false;
    try {
      await deleteAnnouncementMutation.mutate(announcementId);
    } catch (error) {
      console.log(error);
    }
    navigate('/admin/announcements-manage');
  };
  if (!data) return <div></div>;
  return (
    <div>
      AnnouncementDetailManage
      <div>
        <div dangerouslySetInnerHTML={{ __html: data.content || '' }}></div>
      </div>
      <C.ButtonAnnouncement onClick={moveToPageForAnnouncementListManage}>목록</C.ButtonAnnouncement>
      <C.ButtonAnnouncement onClick={handleDeleteAnnouncement}>삭제</C.ButtonAnnouncement>
      <C.ButtonAnnouncement onClick={moveToPageForEditAnnouncementForm}>수정</C.ButtonAnnouncement>
    </div>
  );
};

export default AnnouncementDetailManage;
