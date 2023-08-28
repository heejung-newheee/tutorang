import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import { Arrow } from '@egjs/flicking-plugins';
import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/flicking-plugins/dist/arrow.css';
import { Views } from '../../supabase/database.types';
import * as S from './CompleteClass.styled';
import { icon_location } from '../../assets';

interface CompleteClassProps {
  matchList: Views<'matching_tutor_data'>[];
}

const CompleteClass = (matchList: CompleteClassProps) => {
  const _plugins = [new Arrow()];
  const completeTutor = matchList.matchList;
  console.log(matchList);

  return (
    <>
      <Flicking panelsPerView={6} align="prev" circular={true} plugins={_plugins} style={{ padding: '30px 133px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
        {completeTutor &&
          completeTutor
            .filter((item: Views<'matching_tutor_data'>) => item.matched === true)
            .map((item: Views<'matching_tutor_data'>) => {
              return (
                <S.CompleteTutor key={item.tutor_id} className="card-panel">
                  <S.CompleteImg>
                    <img src={item.tutor_img || undefined} alt="" />
                  </S.CompleteImg>
                  <S.CompleteContents>
                    <S.ComTutorName>{item.tutor_name}</S.ComTutorName>
                    <S.ComTutorLocation>
                      {item.tutor_lc_1_gugun} | {item.tutor_lc_2_gugun}
                    </S.ComTutorLocation>
                    <S.ReviewBtn>리뷰 쓰기</S.ReviewBtn>
                    {/* 클릭 시 이사람 아이디 넘겨주고 후기를 post */}
                  </S.CompleteContents>
                </S.CompleteTutor>
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

export default CompleteClass;
