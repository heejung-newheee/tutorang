import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Tables, Views } from '../../supabase/database.types';
import { RootState } from '../../redux/config/configStore';
import { fetchTutorAll, tutorInfoMatched } from '../../api/tutor';
import { fetchLike } from '../../api/like';
import { getBoard } from '../../api/board';
import * as S from './StudentInfo.styled';
import supabase from '../../supabase';
import { matchingCancel, matchingTutorData } from '../../api/match';
import { InfoItem, InfoList, InfoSection } from '../userInfo/UserInfo.styled';
import CompleteClass from '../completeClassSlider/CompleteClass';
import LikeTutors from '../likeTutorSlider/LikeTutors';
import MatchingTutor from '../matchingTutorTab/MatchingTutor';

interface pageProps {
  match: Views<'matching_tutor_data'>[];
}
const StudentInfo = ({ match }: pageProps) => {
  const { data: tutor, isLoading: tutorLoading, isError: tutorError } = useQuery(['tutor_info_username'], tutorInfoMatched);
  const { data: like, isLoading: likeLoading, isError: likeError } = useQuery(['like'], fetchLike);
  const { data: board, isLoading: boardLoading, isError: boardError } = useQuery(['board'], getBoard);

  const user = useSelector((state: RootState) => state.user.user);
  // console.log('studentInfo 로그인사용자', user);
  console.log('match 테이블 전체', match);

  if (likeLoading || tutorLoading || boardLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (!board || !like || likeError || tutorError || boardError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }

  const likedList = like.filter((item: Tables<'like'>) => item.user_id === user!.id).map((item) => item.liked_id);
  const likedUser = tutor!.filter((item: Views<'tutor_info_join'>) => likedList.includes(item.tutor_id ?? ''));
  console.log(likedList);
  console.log(likedUser);

  // 내가 보낸 요청 내역
  const matchingData = Array.isArray(match) ? match : [match];
  const matchList = matchingData.filter((item: Views<'matching_tutor_data'>) => item.user_id === user!.id);
  console.log(matchList);

  return (
    <div>
      <div>학생 대시보드</div>
      <InfoSection key="likeTutor">
        <h2>찜한 강사 리스트</h2>
        <LikeTutors likedUser={likedUser} />
      </InfoSection>
      <InfoSection key="matchingList">
        <h2>튜터링 요청 내역</h2>
        <MatchingTutor matchList={matchList} />
      </InfoSection>
      <InfoSection key="matchedList">
        <h2>수업했던 튜터</h2>
        <CompleteClass matchList={matchList} />
      </InfoSection>
      <InfoSection key="boardList">
        문의 리스트
        {board!
          .filter((board: Tables<'board'>) => {
            return board.user_id === user!.id;
          })
          .map((item: Tables<'board'>) => {
            return (
              <div key={item.id}>
                <div>{item.title}</div>
                <div>{item.content}</div>
                <div>{item.created_at.split('T')[0]}</div>
              </div>
            );
          })}
      </InfoSection>
    </div>
  );
};

export default StudentInfo;
