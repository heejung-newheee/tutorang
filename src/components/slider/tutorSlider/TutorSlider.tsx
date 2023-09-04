import { Arrow } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/arrow.css';
import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import { Views } from '../../../supabase/database.types';
import ProfilesCard from '../../profilesCard/ProfilesCard';
import * as S from './TutorSlider.styled';
import './custom.css';
interface pageProps {
  tutorList: Views<'tutor_info_join'>[];
  panels: number;
  uniqueKey: string;
}
const TutorSlider = ({ tutorList, panels, uniqueKey }: pageProps) => {
  const _plugins = [new Arrow()];
  // console.log('slider에서 받고 있는 tutorlist', tutorList);
  return (
    <>
      <Flicking key={uniqueKey} panelsPerView={panels} align="20%" circular={true} plugins={_plugins} style={{ padding: '0 50px' }}>
        {/* 처음 가짜 카드 */}
        {/* <S.Empty className="this-start"></S.Empty> */}
        {tutorList &&
          tutorList.map((tutor: Views<'tutor_info_join'>) => {
            let key = `${tutor.tutor_img}+${tutor.tutor_id!.split('-')[0]}`;
            return (
              <S.Tutor to={`/detail/${tutor.tutor_id}`}>
                <ProfilesCard tutor={tutor} key={key} />
              </S.Tutor>
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
