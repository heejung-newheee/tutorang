import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import { Arrow } from '@egjs/flicking-plugins';
import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/flicking-plugins/dist/arrow.css';
import { Views } from '../../supabase/database.types';
import * as S from './LikeTutors.styled';
interface LikeTutorsProps {
  likedUser: Views<'tutor_info_join'>[];
}

const LikeTutors = (likedUser: LikeTutorsProps) => {
  const _plugins = [new Arrow()];
  const likedTutors = likedUser.likedUser;
  console.log(likedTutors);

  return (
    <>
      <Flicking panelsPerView={3} align="prev" circular={true} plugins={_plugins} style={{ padding: '0 67px' }}>
        {likedTutors.map((tutor: Views<'tutor_info_join'>) => {
          return (
            <S.LikeTutor to={`/detail/${tutor.tutor_id}`} key={tutor.tutor_info_id}>
              <S.LikeTutorImg>
                <img src={tutor.tutor_img || undefined} alt="" />
              </S.LikeTutorImg>
              <S.LikeTutorInfo>
                <S.LikeTutorTitle>{tutor.class_info}</S.LikeTutorTitle>
                <S.LikeTutorName>{tutor.tutor_name}</S.LikeTutorName>
                <S.LikeTutorContent>
                  {tutor.price}
                  <S.LikeTag>
                    <div>#열정적인</div>
                    <div>#열정적인</div>
                    <div>#열정적인</div>
                  </S.LikeTag>
                </S.LikeTutorContent>
              </S.LikeTutorInfo>
            </S.LikeTutor>
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
