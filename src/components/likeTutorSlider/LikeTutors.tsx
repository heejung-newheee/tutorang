import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import { Arrow } from '@egjs/flicking-plugins';
import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/flicking-plugins/dist/arrow.css';
import { Views } from '../../supabase/database.types';
import { Link } from 'react-router-dom';
interface LikeTutorsProps {
  likedUser: Views<'tutor_info_join'>[];
}

const LikeTutors = (likedUser: LikeTutorsProps) => {
  const _plugins = [new Arrow()];
  const likedTutors = likedUser.likedUser;
  console.log(likedTutors);

  return (
    <>
      <Flicking panelsPerView={6} align="prev" circular={true} plugins={_plugins}>
        {likedTutors.map((tutor: Views<'tutor_info_join'>) => {
          return (
            <Link to={`/detail/${tutor.tutor_id}`} key={tutor.tutor_info_id}>
              <img src={tutor.tutor_img || undefined} alt="" />
              {tutor.tutor_name}
              {tutor.class_info}
              {tutor.price}
            </Link>
          );
        })}
        <ViewportSlot>
          <span className="flicking-arrow-prev is-circle"></span>
          <span className="flicking-arrow-next is-circle"></span>
        </ViewportSlot>
      </Flicking>
    </>
  );
};

export default LikeTutors;
