import * as S from './BookMark.styled';
import { useQuery } from '@tanstack/react-query';
import { matchBookMark, useCreateBookMarkMutation, useDeleteBookMarkMutation } from '../../api/bookmark';
import { BookMarkType } from '../../supabase/database.types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config/configStore';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BookMark = () => {
  const { id } = useParams();
  if (!id) return;

  const { data: bookMarkList, isError, error } = useQuery(['matchBookMark'], () => matchBookMark(id));
  const [isBookMark, setIsBookMark] = useState(false);

  const loginUser = useSelector((state: RootState) => state.user.user);

  const bookMarkCreateMutation = useCreateBookMarkMutation();
  const bookMarkDeleteMutation = useDeleteBookMarkMutation();

  useEffect(() => {
    if (bookMarkList?.length === 0) {
      setIsBookMark(false);
    } else {
      setIsBookMark(true);
    }
  }, [bookMarkList]);

  const handleToggleBookMark = async () => {
    const newBookMark: BookMarkType = {
      tutor_id: id || '',
      user_id: loginUser?.id || '',
    };

    if (isBookMark === false) {
      bookMarkCreateMutation.mutate(newBookMark);
    } else {
      bookMarkDeleteMutation.mutate(id);
    }
  };

  if (isError) {
    console.log('supabase Error', error);
    return null;
  }

  return (
    <div>
      <button onClick={() => handleToggleBookMark()}> {isBookMark === false ? `북마크` : `북마크 해제`} </button>
    </div>
  );
};

export default BookMark;
