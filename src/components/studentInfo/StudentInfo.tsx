import { useQuery } from '@tanstack/react-query';
import { fetchLike, fetchTutor } from '../../api/user';
import * as S from './StudentInfo.styled';
import { Tables } from '../../supabase/database.types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config/configStore';
import { getBoard } from '../../api/tutor';

const StudentInfo = () => {
  const { data: tutor, isLoading: tutorLoading, isError: tutorError } = useQuery(['tutor'], fetchTutor);
  const { data: like, isLoading: likeLoading, isError: likeError } = useQuery(['like'], fetchLike);
  const { data: board, isLoading: boardLoading, isError: boardError } = useQuery(['board'], getBoard);
  const user = useSelector((state: RootState) => state.user.user);

  if (likeLoading || tutorLoading || boardLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (!board || !like || likeError || tutorError || boardError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }

  const likedList = like.filter((item: Tables<'like'>) => item.user_id === user!.id).map((item) => item.liked_id);
  const likedUser = tutor!.filter((item: Tables<'tutor_info'>) => likedList.includes(item.user_id ?? ''));

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
                {item.title}
                {item.content}
              </S.TutorItem>
            );
          })}
      </S.TutorList>
    </div>
  );
};

export default StudentInfo;
