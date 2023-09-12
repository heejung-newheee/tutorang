import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { ANNOUNCEMENTS_QUERY_KEY, getAllAnnouncements } from '../../../api/announcements';
import * as C from './ManageAnnouncementCommon.style';

const AnnouncementsListManage = () => {
  const navigate = useNavigate();
  const { data } = useQuery([ANNOUNCEMENTS_QUERY_KEY], getAllAnnouncements);
  console.log(data);

  const moveToPageForCreateAnnouncementForm = () => navigate('/admin-form/create-announcement');
  return (
    <div>
      <C.ButtonAnnouncement onClick={moveToPageForCreateAnnouncementForm}>새공지 작성</C.ButtonAnnouncement>
      <h1>AnnouncementsListManage</h1>
      <LisingContainer>
        {data?.map((announcementItem) => (
          <ListingItem key={announcementItem.id}>
            <Link to={`/admin/announcements-manage/${announcementItem.id}`}>{announcementItem.title}</Link>
          </ListingItem>
        ))}
      </LisingContainer>
    </div>
  );
};

export default AnnouncementsListManage;

// 임시
const LisingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ListingItem = styled.div`
  border: 1px solid #000;
  padding: 20px;
`;
