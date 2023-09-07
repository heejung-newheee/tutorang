import { Arrow } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/arrow.css';
import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import { Views } from '../../../supabase/database.types';
import ProfilesCard from '../../profilesCard/ProfilesCard';
import * as S from '../TutorSlider.styled';
import './custom.css';
interface pageProps {
  tutorList: Views<'tutor_info_join'>[];
  panels: number;
  uniqueKey: string;
}
const LikeTutorSlider = ({ tutorList, panels, uniqueKey }: pageProps) => {
  const _plugins = [new Arrow()];

  return (
    <>
      <Flicking key={uniqueKey} panelsPerView={panels} align="19%" circular={true} plugins={_plugins} style={{ padding: '0 50px' }}>
        {tutorList &&
          tutorList.map((tutor: Views<'tutor_info_join'>) => {
            const key = `${uniqueKey}+${tutor.tutor_id!.split('-')[0]}`;
            return (
              <S.Tutor to={`/detail/${tutor.tutor_id}`} key={key} style={{ minWidth: '280px' }}>
                <ProfilesCard tutor={tutor} />
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

export default LikeTutorSlider;
