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
  uniqueKey: string;
}
const TutorSlider = ({ tutorList, panels, uniqueKey }: pageProps) => {
  const _plugins = [new Arrow()];

  return (
    <>
      <Flicking key={uniqueKey} panelsPerView={panels} align="20%" circular={true} plugins={_plugins} style={{ padding: '0 50px' }}>
        {/* 처음 가짜 카드 */}
        {/* <S.Empty className="this-start"></S.Empty> */}
        {tutorList.map((tutor: Views<'tutor_info_join'>) => {
          return (
            <S.Tutor to={`/detail/${tutor.tutor_id}`} key={tutor.tutor_id}>
              <ProfilesCard tutor={tutor} key={tutor.tutor_id} />
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
