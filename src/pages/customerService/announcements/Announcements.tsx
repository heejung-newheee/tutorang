import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { ANNOUNCEMENTS_QUERY_KEY, getAllAnnouncements } from '../../../api/announcements';

const Announcements = () => {
  const { data } = useQuery([ANNOUNCEMENTS_QUERY_KEY], getAllAnnouncements);
  console.log(data);

  return (
    <div>
      {' '}
      <LisingContainer>
        {data?.map((announcementItem) => (
          <ListingItem key={announcementItem.id}>
            <Link to={`/customer-service/announcements/${announcementItem.id}`}>{announcementItem.title}</Link>
          </ListingItem>
        ))}
      </LisingContainer>
    </div>
  );
};

export default Announcements;

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
