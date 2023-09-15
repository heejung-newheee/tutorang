import { AutoPlay } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/arrow.css';
import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import { useEffect, useState } from 'react';
import { Views } from '../../../supabase/database.types';
import ProfilesCard from '../../profilesCard/ProfilesCard';
import * as S from '../TutorSlider.styled';
import './custom.css';
interface pageProps {
  tutorList: Views<'tutor_top_reviewer'>[];
  panels: number;
  uniqueKey: string;
}

const PopTutorSlider = ({ tutorList, panels, uniqueKey }: pageProps) => {
  const _plugins = [new AutoPlay({ duration: 2000, direction: 'NEXT', stopOnHover: false })];

  const calcAlign = () => {
    if (window.innerWidth >= 1600) {
      return '21%';
    } else if (window.innerWidth > 1200) {
      return '16%';
    } else {
      return '0%';
    }
  };
  const [align, setAlign] = useState(calcAlign);

  useEffect(() => {
    const handleResize = () => {
      const newAlign = calcAlign();
      setAlign(newAlign);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <Flicking key={uniqueKey} panelsPerView={panels} align={`${align}`} circular={true} plugins={_plugins}>
        {tutorList &&
          tutorList.map((tutor: Views<'tutor_top_reviewer'>) => {
            const key = `${uniqueKey}+${tutor.tutor_id!.split('-')[0]}`;
            return (
              <S.Tutor to={`/detail/${tutor.tutor_id}`} key={key} style={{ minWidth: '280px' }}>
                <ProfilesCard tutor={tutor} />
              </S.Tutor>
            );
          })}
      </Flicking>
    </>
  );
};

export default PopTutorSlider;
