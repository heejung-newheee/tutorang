import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import { Arrow } from '@egjs/flicking-plugins';
import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/flicking-plugins/dist/arrow.css';
import { Views } from '../../supabase/database.types';

interface CompleteClassProps {
  matchList: Views<'matching_tutor_data'>[];
}

const CompleteClass = (matchList: CompleteClassProps) => {
  const _plugins = [new Arrow()];
  const completeTutor = matchList.matchList;
  console.log(matchList);

  return (
    <>
      <Flicking panelsPerView={6} align="prev" circular={true} plugins={_plugins}>
        {completeTutor &&
          completeTutor
            .filter((item: Views<'matching_tutor_data'>) => item.matched === true)
            .map((item: Views<'matching_tutor_data'>) => {
              return (
                <div key={item.tutor_id} className="card-panel">
                  <img src={item.tutor_img || undefined} alt="" />
                  <div>{item.tutor_name}</div>
                  <div>
                    {item.tutor_lc_1}|{item.tutor_lc_2}
                  </div>
                  <button>리뷰 남기기 버튼</button>
                  {/* 클릭 시 이사람 아이디 넘겨주고 후기를 post */}
                </div>
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
