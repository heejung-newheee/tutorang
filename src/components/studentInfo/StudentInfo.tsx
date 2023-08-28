import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Tables, Views } from '../../supabase/database.types';
import { RootState } from '../../redux/config/configStore';

import { getBoard } from '../../api/board';
import * as S from './StudentInfo.styled';
import supabase from '../../supabase';
import { matchingCancel, matchingTutorData } from '../../api/match';
import { Container, InfoItem, InfoList, InfoSection, InfoTitle } from '../userInfo/UserInfo.styled';
import CompleteClass from '../completeClassSlider/CompleteClass';
import LikeTutorsSlider from '../likeTutorSlider/LikeTutorsSlider';
import MatchingTutor from '../matchingTab/MatchingTutor';
import ProfilesCard from '../profilesCard/ProfilesCard';

interface pageProps {
  match: Views<'matching_tutor_data'>[];
}
const StudentInfo = ({ match }: pageProps) => {
  // const { data: tutor, isLoading: tutorLoading, isError: tutorError } = useQuery(['tutor_info_join'], tutorInfoJoin);
  // const { data: like, isLoading: likeLoading, isError: likeError } = useQuery(['like'], fetchLike);
  const { data: board, isLoading: boardLoading, isError: boardError } = useQuery(['board'], getBoard);

  const user = useSelector((state: RootState) => state.user.user);
  // const tutors = useSelector((state: RootState) => state.tutor.tutor);
  // console.log('tutor', tutors);
  console.log('match 테이블 전체', match);

  if (boardLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (!board || boardError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }

  // const likedList = like.filter((item: Tables<'like'>) => item.user_id === user!.id).map((item) => item.liked_id);
  // const likedUser = tutors!.filter((item: Views<'tutor_info_join'>) => likedList.includes(item.tutor_id ?? ''));
  // console.log(likedList);
  // console.log(likedUser);

  // 내가 보낸 요청 내역
  const matchingData = Array.isArray(match) ? match : [match];
  const matchList = matchingData.filter((item: Views<'matching_tutor_data'>) => item.user_id === user!.id);
  console.log(matchList);

  return (
    <div>
      <div>학생 대시보드</div>
      <InfoSection>
        <Container>
          <InfoTitle>찜한 강사 리스트</InfoTitle>
          <LikeTutorsSlider />
        </Container>
      </InfoSection>
      <InfoSection>
        <Container>
          <InfoTitle>튜터링 요청 내역</InfoTitle>
          <MatchingTutor matchList={matchList} />
        </Container>
      </InfoSection>
      <InfoSection>
        <Container>
          <InfoTitle>수업했던 튜터</InfoTitle>
          <CompleteClass matchList={matchList} />
        </Container>
      </InfoSection>
      <InfoSection>
        <Container>
          <InfoTitle>문의 리스트</InfoTitle>
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
        </Container>
      </InfoSection>
    </div>
  );
};

export default StudentInfo;
