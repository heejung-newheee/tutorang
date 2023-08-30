import * as S from './BookMark.styled';
import { useQuery } from '@tanstack/react-query';
import { matchBookMark, useCreateBookMarkMutation, useDeleteBookMarkMutation } from '../../api/bookmark';
import { BookMarkType } from '../../supabase/database.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/config/configStore';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { openModal } from '../../redux/modules';

const BOOK_MARK_QUERY_KEY = ['matchBookMark'];

const BookMark = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  if (!id) return;

  const loginUser = useSelector((state: RootState) => state.user.user);

  const { data: bookMarkList, isError, error } = useQuery(BOOK_MARK_QUERY_KEY, () => matchBookMark(id));
  const [isBookMark, setIsBookMark] = useState(false);

  const findBookMark = bookMarkList?.find((bookmark) => bookmark.user_id === loginUser?.id);

  const bookMarkCreateMutation = useCreateBookMarkMutation();
  const bookMarkDeleteMutation = useDeleteBookMarkMutation();

  useEffect(() => {
    if (findBookMark) {
      setIsBookMark(true);
    } else {
      setIsBookMark(false);
    }
  }, [findBookMark]);

  const handleToggleBookMark = async () => {
    if (!loginUser) {
      dispatch(openModal({ type: 'confirm' }));
      return null;
    }

    const newBookMark: BookMarkType = {
      liked_id: id || '',
      user_id: loginUser?.id || '',
    };

    if (isBookMark === false) {
      await bookMarkCreateMutation.mutate(newBookMark);
    } else {
      await bookMarkDeleteMutation.mutate(id);
    }
  };

  if (isError) {
    console.log('supabase Error', error);
    return null;
  }

  return (
    <div>
      <button onClick={() => handleToggleBookMark()}> {isBookMark ? `북마크 해제` : `북마크`} </button>
    </div>
  );
};

export default BookMark;
