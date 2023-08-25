import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Tables } from '../../supabase/database.types';
import { RootState } from '../../redux/config/configStore';
import { fetchTutorAll } from '../../api/tutor';
import { fetchLike } from '../../api/like';
import { getBoard } from '../../api/board';
import * as S from './StudentInfo.styled';
import supabase from '../../supabase';
import { matchingCancel } from '../../api/match';

interface pageProps {
  match: Tables<'matching'>;
}
const StudentInfo = (match: pageProps) => {
  const queryClient = useQueryClient();
  const { data: tutor, isLoading: tutorLoading, isError: tutorError } = useQuery(['tutor'], fetchTutorAll);
  const { data: like, isLoading: likeLoading, isError: likeError } = useQuery(['like'], fetchLike);
  const { data: board, isLoading: boardLoading, isError: boardError } = useQuery(['board'], getBoard);
  const user = useSelector((state: RootState) => state.user.user);
  // console.log('studentInfo 로그인사용자', user);
  // console.log('match', match);

  const cancelMatchMutation = useMutation(matchingCancel, {
    onSuccess: () => {
      queryClient.invalidateQueries(['matching']);
    },
  });

  const cancelMatch = async (id: string) => {
    cancelMatchMutation.mutate(id);
  };

  if (likeLoading || tutorLoading || boardLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (!board || !like || likeError || tutorError || boardError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }

  const likedList = like.filter((item: Tables<'like'>) => item.user_id === user!.id).map((item) => item.liked_id);
  const likedUser = tutor!.filter((item: Tables<'tutor_info'>) => likedList.includes(item.user_id ?? ''));

  const matching = match.match || [];
  // console.log(matching);
  // 내가 보낸 요청 내역
  const matchingData = Array.isArray(matching) ? matching : [matching];

  const matchList = matchingData.filter((item: Tables<'matching'>) => item.user_id === user!.id);
  // console.log(matchList);

  return (
    <div>
      <div>학생 대시보드</div>
      찜한 강사 리스트
      <S.LikeTutorList>
        {likedUser.map((tutor: Tables<'tutor_info'>) => {
          return (
            <S.LikeTutorItem key={tutor.id}>
              {tutor.class_info}
              {tutor.price}
            </S.LikeTutorItem>
          );
        })}
      </S.LikeTutorList>
      <div>
        <div>요청 내역</div>
        {matchList &&
          matchList.map((item: Tables<'matching'>) => {
            return (
              <div key={item.id}>
                <div>요청 상태{item.status}</div>
                <div>날짜{item.created_at.split('T')[0]}</div>
                <div>튜터 이름</div>
                <div>지역</div>
                <button onClick={() => cancelMatch(item.id)}>요청 취소 버튼</button>
              </div>
            );
          })}
      </div>
      수업했던 튜터
      <S.TutorList>
        <S.TutorItem>튜터1</S.TutorItem>
        {/* 클릭 시 이사람 아이디 넘겨주고 후기를 post */}
        <S.TutorItem>튜터2</S.TutorItem>
      </S.TutorList>
      문의 리스트
      <S.TutorList>
        {board!
          .filter((board: Tables<'board'>) => {
            return board.user_id === user!.id;
          })
          .map((item: Tables<'board'>) => {
            return (
              <S.TutorItem key={item.id}>
                <div>{item.title}</div>
                <div>{item.content}</div>
                <div>{item.created_at.split('T')[0]}</div>
              </S.TutorItem>
            );
          })}
      </S.TutorList>
    </div>
  );
};

export default StudentInfo;
