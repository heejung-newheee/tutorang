import { useQuery } from '@tanstack/react-query';
import { ANNOUNCEMENTS_QUERY_KEY, getAllAnnouncements } from '../../../api/announcements';

const Announcements = () => {
  const data = useQuery([ANNOUNCEMENTS_QUERY_KEY], getAllAnnouncements);
  console.log(data);
  return <div>Announcements</div>;
};

export default Announcements;
