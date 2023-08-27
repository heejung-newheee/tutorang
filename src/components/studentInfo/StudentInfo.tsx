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

interface pageProps {
  match: Tables<'matching'>[];
}
const StudentInfo = ({ match }: pageProps) => {
  const queryClient = useQueryClient();
  const { data: tutor, isLoading: tutorLoading, isError: tutorError } = useQuery(['tutor_info_username'], tutorInfoMatched);
  const { data: like, isLoading: likeLoading, isError: likeError } = useQuery(['like'], fetchLike);
  const { data: board, isLoading: boardLoading, isError: boardError } = useQuery(['board'], getBoard);

  const user = useSelector((state: RootState) => state.user.user);
  // console.log('studentInfo 로그인사용자', user);
  console.log('match 테이블 전체', match);

  const cancelMatchMutation = useMutation(matchingCancel, {
    onSuccess: () => {
      queryClient.invalidateQueries(['matching']);
    },
  });

  // 튜터 이미지, 이름, 지역 필요

  // console.log('튜터리스트', tutor);

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
  const likedUser = tutor!.filter((item: Views<'tutor_info_join'>) => likedList.includes(item.tutor_id ?? ''));

  // 내가 보낸 요청 내역
  const matchingData = Array.isArray(match) ? match : [match];
  const matchList = matchingData.filter((item: Tables<'matching'>) => item.user_id === user!.id);
  console.log(matchList);

  return (
    <div>
      <div>학생 대시보드</div>
      찜한 강사 리스트
      <S.LikeTutorList>
        {likedUser.map((tutor: Views<'tutor_info_join'>) => {
          return (
            <S.LikeTutorItem key={tutor.tutor_info_id}>
              {tutor.tutor_name}
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
      <div>
        수업했던 튜터
        {matchList &&
          matchList
            .filter((item) => item.matched === true)
            .map((item: Tables<'matching'>) => {
              return (
                <div key={item.id}>
                  <div>튜터 이름</div>
                  <div>지역</div>
                  <button>리뷰 남기기</button>

                  {/* 클릭 시 이사람 아이디 넘겨주고 후기를 post */}
                </div>
              );
            })}
      </div>
      문의 리스트
      <div>
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
      </div>
    </div>
  );
};

export default StudentInfo;
