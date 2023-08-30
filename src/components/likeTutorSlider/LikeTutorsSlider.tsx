import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import { Arrow } from '@egjs/flicking-plugins';
import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/flicking-plugins/dist/arrow.css';
import { Tables, Views } from '../../supabase/database.types';
import * as S from './LikeTutors.styled';
import { fetchLike } from '../../api/like';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config/configStore';
import { useQuery } from '@tanstack/react-query';
import ProfilesCard from '../profilesCard/ProfilesCard';

const LikeTutorsSlider = () => {
  const _plugins = [new Arrow()];
  const { data: like, isLoading: likeLoading, isError: likeError } = useQuery(['like'], fetchLike);

  const user = useSelector((state: RootState) => state.user.user);
  const tutors = useSelector((state: RootState) => state.tutor.tutor);

  if (likeLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (likeError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }
  if (!like || !tutors) {
    return null;
  }
  // console.log('LikeTutorsSlider---user', user);
  // console.log('LikeTutorsSlider---tutors', tutors);

  // 좋아요한 튜터 아이디만 가져오기
  const likedList = like.filter((item: Tables<'like'>) => item.user_id === user!.id).map((item) => item.liked_id);
  // 튜터 아이디를 포함하고있는 tutor_info 리스트 가져오기
  const likedUser = tutors!.filter((item: Views<'tutor_info_join'>) => likedList.includes(item.tutor_id ?? ''));

  // console.log(likedList);
  // console.log(likedUser);

  return (
    <>
      <Flicking panelsPerView={3} align="prev" circular={true} plugins={_plugins} style={{ padding: '0 67px' }}>
        {likedUser.map((tutor: Views<'tutor_info_join'>) => {
          return (
            <S.LikeTutor to={`/detail/${tutor.tutor_id}`} key={tutor.tutor_info_id}>
              <S.LikeTutorImg>
                <img src={tutor.tutor_img || undefined} alt="" />
              </S.LikeTutorImg>
              <S.LikeTutorInfo>
                <S.LikeTutorTitle>{tutor.class_info}</S.LikeTutorTitle>
                <S.LikeTutorName>{tutor.tutor_name}</S.LikeTutorName>
                <S.LikeTutorContent>
                  {tutor.location1_gugun} | {tutor.location2_gugun}
                  {tutor.university} | {tutor.major}
                  <S.LikeTag>
                    <div>#{tutor.personality}</div>
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

export default LikeTutorsSlider;
