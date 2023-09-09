import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/modules';

const Announcements = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(closeModal());
    };
  }, []);

  return <div>Announcements</div>;
};

export default Announcements;
