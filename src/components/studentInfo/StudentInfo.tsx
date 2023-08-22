import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBoard, fetchData, fetchLike } from '../../api/user';
import * as S from './StudentInfo.styled';
import { Tables } from '../../supabase/database.types';
import supabase from '../../supabase';

const StudentInfo = () => {
  const { data, isLoading, isError } = useQuery(['profiles'], fetchData);
  const { data: like, isLoading: likeLoading, isError: likeError } = useQuery(['like'], fetchLike);
  const { data: board, isLoading: boardLoading, isError: boardError } = useQuery(['board'], fetchBoard);
  console.log(data);
  console.log(like);
  console.log(board);

  const [user, setUser] = useState<Tables<'profiles'> | null>();

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    // setUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {}, []);
  if (likeLoading || boardLoading) {
    return <div>로딩중~~~~~~~~~~~</div>;
  }
  if (!like || !board || likeError || boardError) {
    return <div>데이터를 불러오는 중에 오류가 발생했습니다.</div>;
  }

  const likedList = like.filter((item) => item.user_id === user!.id).map((item) => item.liked_id);
  const likedUser = data!.filter((item) => likedList.includes(item.id));
  return (
    <div>
      <div>학생 대시보드</div>
      찜한 강사 리스트
      <S.LikeTutorList>
        {/* {likedUser.map((tutor: Tables<'tutor_info'>) => {
          return <S.LikeTutorItem key={tutor.id}>{tutor.username}</S.LikeTutorItem>;
        })} */}
      </S.LikeTutorList>
      수업했던 튜터
      <S.TutorList>
        <S.TutorItem>튜터1</S.TutorItem>
        {/* 클릭 시 이사람 아이디 넘겨주고 후기를 post */}
        <S.TutorItem>튜터2</S.TutorItem>
      </S.TutorList>
      문의 리스트
      <S.TutorList>
        {/* {board!
          .filter((board) => {
            return board.user_id === user!.id;
          })
          .map((item) => {
            return (
              <S.TutorItem key={item.id}>
                {item.title}
                {item.content}
              </S.TutorItem>
            );
          })} */}
      </S.TutorList>
    </div>
  );
};

export default StudentInfo;
