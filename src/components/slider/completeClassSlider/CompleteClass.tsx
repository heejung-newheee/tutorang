import { Arrow } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/arrow.css';
import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { matchingRequest } from '../../../api/match';
import { openModal } from '../../../redux/modules';
import { Views } from '../../../supabase/database.types';
import * as S from './CompleteClass.styled';

interface CompleteClassProps {
  matchList: Views<'matching_tutor_data'>[];
}

const CompleteClass = ({ matchList }: CompleteClassProps) => {
  const dispatch = useDispatch();
  const _plugins = [new Arrow()];

  const handleReviewCreate = (tutor_id: string, matching_id: string): void => {
    dispatch(openModal({ type: 'matchedReviewCreate', targetId: tutor_id, matchingId: matching_id }));
  };
  const handleRequestReTutoring = async (tutor_id: string, user_id: string) => {
    try {
      await matchingRequest({ tutorId: tutor_id, userId: user_id });
    } catch (error) {
      if (error instanceof Error) window.alert(error.message || error);
    }
    window.alert('성공적으로 튜터링을 요청했습니다.');
  };

  return (
    <>
      <S.Descktop className="Descktop-only">
        <Flicking panelsPerView={6} align="prev" circular={true} plugins={_plugins} style={{ padding: '30px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
          {matchList &&
            matchList
              .filter((item: Views<'matching_tutor_data'>) => item.matched === true)
              .map((item: Views<'matching_tutor_data'>) => {
                return (
                  <S.CompleteTutor key={item.id} className="card-panel">
                    <Link to={`/detail/${item.tutor_id}`} style={{ width: '100%' }}>
                      <S.CompleteImg src={item.tutor_img || undefined} alt="" />
                      <S.CompleteContents>
                        <S.ComTutorName>{item.tutor_name}</S.ComTutorName>
                        <S.ComTutorLocation>
                          {item.tutor_lc_1_gugun} | {item.tutor_lc_2_gugun}
                        </S.ComTutorLocation>
                      </S.CompleteContents>
                    </Link>
                    <S.ReviewBtnWrap>
                      {item.review_confirm ? (
                        <S.ReviewBtn onClick={() => handleRequestReTutoring(item.tutor_id!, item.user_id!)}>재요청</S.ReviewBtn>
                      ) : (
                        <S.ReviewBtn className="review-btn" onClick={() => handleReviewCreate(item.tutor_id!, item.id!)}>
                          리뷰 쓰기
                        </S.ReviewBtn>
                      )}
                    </S.ReviewBtnWrap>
                  </S.CompleteTutor>
                );
              })}
          <ViewportSlot>
            <span className="flicking-arrow-prev is-circle"></span>
            <span className="flicking-arrow-next is-circle"></span>
          </ViewportSlot>
        </Flicking>
      </S.Descktop>
    </>
  );
};

export default CompleteClass;
