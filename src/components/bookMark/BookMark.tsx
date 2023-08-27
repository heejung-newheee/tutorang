import * as S from './BookMark.styled';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBookMark, deleteBookMark, fetchBookmark } from '../../api/bookmark';
import { BookMarkType } from '../../supabase/database.types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config/configStore';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BookMark = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: bookMarkList, isError, isLoading, error } = useQuery(['bookMark'], fetchBookmark);
  const loginUser = useSelector((state: RootState) => state.user.user);
  const [isBookMark, setIsBookMark] = useState(false);

  useEffect(() => {
    // supabase DB에 해당 tutor의 bookMark 데이터가 있는지 확인합니다.
    const userBookMarkList = bookMarkList?.filter((bookmark) => bookmark.tutor_id === id);

    // 북마크 상태 확인 : (length !== 0) ? bookMark 비활성화 : bookMark 활성화
    if (userBookMarkList?.length === 0) {
      setIsBookMark(false);
    } else {
      setIsBookMark(true);
    }
  }, [bookMarkList]);

  const mutationCreateBookMark = useMutation(createBookMark, {
    onSuccess: () => {
      queryClient.invalidateQueries(['bookMark']);
    },
  });

  const mutationDeleteBookMark = useMutation(deleteBookMark, {
    onSuccess: () => {
      queryClient.invalidateQueries(['bookMark']);
    },
  });

  const handleToggleBookMark = async () => {
    const bookMarkState: BookMarkType = {
      tutor_id: id || '',
      user_id: loginUser?.id || '',
    };

    if (isBookMark === false) {
      mutationCreateBookMark.mutate(bookMarkState);
    } else {
      mutationDeleteBookMark.mutate(id);
    }
  };

  if (isError) {
    return console.log('supabase Error', error);
  }

  return (
    <div>
      <button onClick={() => handleToggleBookMark()}> {isBookMark === false ? `북마크` : `북마크 해제`} </button>
    </div>
  );
};

export default BookMark;
