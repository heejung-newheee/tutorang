import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBoard, fetchLike } from '../../api/user';
import * as S from './StudentInfo.styled';
import { Tables } from '../../supabase/database.types';

const StudentInfo = ({ user }: Tables<'user'>[]) => {
  const { data: like, isLoading: likeLoading, isError: likeError } = useQuery(['like'], fetchLike);
  const { data: board, isLoading: boardLoading, isError: boardError } = useQuery(['board'], fetchBoard);
  useEffect(() => {}, []);
  if (likeLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (likeError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }
  if (!like) {
    return <div>없음</div>;
  }
  console.log(user);

  const thisUser = user.find((item) => 123456 === item.id);
  console.log(thisUser);

  const likedList = like.filter((item) => item.user_id === thisUser!.id).map((item) => item.liked_id);
  const likedUser = user.filter((item) => likedList.includes(item.id));
  return (
    <div>
      <hr />
      <div>학생 대시보드</div>
      찜한 강사 리스트
      <S.LikeTutorList>
        {likedUser.map((tutor) => {
          return <S.LikeTutorItem key={tutor.id}>{tutor.name}</S.LikeTutorItem>;
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
          .filter((board) => {
            return board.user_id === thisUser!.id;
          })
          .map((item) => {
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
