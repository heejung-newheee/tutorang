import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Tables, Views } from '../../supabase/database.types';
import { RootState } from '../../redux/config/configStore';
import { getBoard } from '../../api/board';
import { Container, InfoNull, InfoSection, InfoTitle } from '../userInfo/UserInfo.styled';
import CompleteClass from '../slider/completeClassSlider/CompleteClass';
import TutorSlider from '../slider/tutorSlider/TutorSlider';
import MatchingTutor from '../matchingTab/MatchingTutor';
import { fetchLike } from '../../api/like';

const BOARD_QUERY_KEY = ['board'];
interface pageProps {
  match: Views<'matching_tutor_data'>[];
}
const StudentInfo = ({ match }: pageProps) => {
  const { data: board, isLoading: boardLoading, isError: boardError } = useQuery([BOARD_QUERY_KEY], getBoard);
  const user = useSelector((state: RootState) => state.user.user);
  const tutors = useSelector((state: RootState) => state.tutor.tutor);

  const { data: like, isLoading: likeLoading, isError: likeError } = useQuery(['like'], fetchLike);

  if (boardLoading || likeLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (boardError || likeError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }
  if (!board || !like || !tutors) {
    return null;
  }
  console.log('LikeTutorsSlider---user', user);
  console.log('LikeTutorsSlider---tutors', tutors);

  // 좋아요한 튜터 아이디만 가져오기
  const likedList = like.filter((item: Tables<'like'>) => item.user_id === user!.id).map((item) => item.liked_id);
  // 튜터 아이디를 포함하고있는 tutor_info 리스트 가져오기
  const likedUser = tutors!.filter((item: Views<'tutor_info_join'>) => likedList.includes(item.tutor_id ?? ''));

  console.log('likedList', likedList);
  console.log('likedUser', likedUser);
  // 내가 보낸 요청 내역
  const matchingData = Array.isArray(match) ? match : [match];
  const matchList = matchingData.filter((item: Views<'matching_tutor_data'>) => item.user_id === user!.id);

  return (
    <div>
      <InfoTitle>학생 대시보드</InfoTitle>
      <InfoSection>
        <Container>
          <InfoTitle>찜한 강사 리스트</InfoTitle>
          {likedUser.length > 0 ? <TutorSlider uniqueKey="studentinfo" tutorList={likedUser} panels={3} /> : <InfoNull>찜한 강사가 없습니다</InfoNull>}
        </Container>
      </InfoSection>
      <InfoSection>
        <Container>
          <InfoTitle>튜터링 요청 내역</InfoTitle>
          {matchList.length > 0 ? <MatchingTutor matchList={matchList} /> : <InfoNull>요청한 튜터링 내역이 없습니다</InfoNull>}
        </Container>
      </InfoSection>
      <InfoSection>
        <Container>
          <InfoTitle>수업했던 튜터</InfoTitle>
          {matchList.length > 0 ? <CompleteClass matchList={matchList} /> : <InfoNull>튜터링 완료한 내역이 없습니다</InfoNull>}
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
