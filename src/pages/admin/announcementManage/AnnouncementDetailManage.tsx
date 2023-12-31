import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ANNOUNCEMENTS_QUERY_KEY, ONE_ANNOUNCEMENT_QUERY_KEY, deleteAnnouncement, getOneAnnouncement } from '../../../api/announcements';
import { AppDispatch, RootState } from '../../../redux/config/configStore';
import { clearModal, displayToastAsync, openModal } from '../../../redux/modules';
import { getTimeTextFromISODate } from '../../../utils/Date';
import { FilterContainer, Layout, Title } from '../boardManage/BoardManage.styled';
import * as C from './../CommonCustomerServiceManagement.style';
import * as S from './AnnouncementDetailManage.style';

const AnnouncementDetailManage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isConfirm, modalId } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch<AppDispatch>();
  const announcementId = useLocation().pathname.split('/')[3];
  const { data } = useQuery([ONE_ANNOUNCEMENT_QUERY_KEY, announcementId], () => getOneAnnouncement(announcementId), { enabled: !!announcementId });

  const deleteAnnouncementMutation = useMutation(async (announcementId: string) => deleteAnnouncement(announcementId), {
    onSuccess: () => {
      queryClient.invalidateQueries([ANNOUNCEMENTS_QUERY_KEY]);
      queryClient.invalidateQueries([ONE_ANNOUNCEMENT_QUERY_KEY]);
      navigate('/admin/announcements-manage');
    },
    onError: (error) => {
      dispatch(displayToastAsync({ id: Date.now(), type: 'warning', message: String(error) }));
    },
  });

  const moveToPageForEditAnnouncementForm = () => {
    navigate(`/admin-form/edit-announcement/${announcementId}`, { state: data });
  };

  const handleDeleteAnnouncement = async () => {
    dispatch(openModal({ type: 'confirm', message: '해당공지를 삭제하시겠습니까?', modalId: 'handleDeleteAnnouncement' }));
  };

  useEffect(() => {
    if (isConfirm && modalId === 'handleDeleteAnnouncement') {
      deleteAnnouncementMutation.mutate(announcementId);
      dispatch(clearModal());
    }
  }, [isConfirm]);

  if (!data) return <div></div>;
  return (
    <Layout>
      <FilterContainer>
        <C.TitleHeader>
          <Title>공지사항 관리</Title>
          <C.ButtonAnnouncement>
            <Link to="/admin/announcements-manage">목록</Link>
          </C.ButtonAnnouncement>
        </C.TitleHeader>
        <C.CSContentContainer className="border_bottom">
          <S.ContentTitle>{data.title}</S.ContentTitle>
          <S.NoticeContent>
            <div dangerouslySetInnerHTML={{ __html: data.content || '' }}></div>
          </S.NoticeContent>
          <S.TextNoticeDate>{getTimeTextFromISODate(data.created_at)}</S.TextNoticeDate>
        </C.CSContentContainer>
        <C.ButtonWrap>
          <C.ButtonAnnouncement onClick={handleDeleteAnnouncement}>삭제</C.ButtonAnnouncement>
          <C.ButtonAnnouncement onClick={moveToPageForEditAnnouncementForm}>수정</C.ButtonAnnouncement>
        </C.ButtonWrap>
      </FilterContainer>
    </Layout>
  );
};

export default AnnouncementDetailManage;
