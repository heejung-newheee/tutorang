import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import { Arrow } from '@egjs/flicking-plugins';
import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/flicking-plugins/dist/arrow.css';
import './custom.css';
import { Views } from '../../../supabase/database.types';
import * as S from './TutorSlider.styled';
import ProfilesCard from '../../profilesCard/ProfilesCard';
interface pageProps {
  tutorList: Views<'tutor_info_join'>[];
  panels: number;
}
const TutorSlider = ({ tutorList, panels }: pageProps) => {
  // 튜터 리스트랑 panels갯수 넘겨주시고 사용하세요! 갯수가 3이랑 다르면 css 손봐야함
  const _plugins = [new Arrow()];
  return (
    <>
      <Flicking panelsPerView={panels} align="prev" circular={true} plugins={_plugins} style={{ padding: '0 50px' }}>
        {tutorList.map((tutor: Views<'tutor_info_join'>) => {
          return (
            // <S.LikeTutor to={`/detail/${tutor.tutor_id}`} key={tutor.tutor_info_id}>
            //   <S.LikeTutorImg>
            //     <img src={tutor.tutor_img || undefined} alt="" />
            //   </S.LikeTutorImg>
            //   <S.LikeTutorInfo>
            //     <S.LikeTutorTitle>{tutor.class_info}</S.LikeTutorTitle>
            //     <S.LikeTutorName>{tutor.tutor_name}</S.LikeTutorName>
            //     <S.LikeTutorContent>
            //       <div>
            //         {tutor.location1_gugun} | {tutor.location2_gugun}
            //       </div>
            //       <div>
            //         {tutor.university} | {tutor.major}
            //       </div>
            //       <S.LikeTag>
            //         {tutor.personality && tutor.personality.length > 0 ? (
            //           <>
            //             <div>#{tutor.personality[0]}</div>
            //             <div>#{tutor.personality[1]}</div>
            //             <div>#{tutor.personality[2]}</div>
            //           </>
            //         ) : (
            //           <div></div>
            //         )}
            //       </S.LikeTag>
            //     </S.LikeTutorContent>
            //   </S.LikeTutorInfo>
            // </S.LikeTutor>
            <S.LikeTutor to={`/detail/${tutor.tutor_id}`} key={tutor.tutor_info_id}>
              <ProfilesCard tutor={tutor} />
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

export default TutorSlider;
