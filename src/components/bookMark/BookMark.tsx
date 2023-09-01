import * as S from './BookMark.styled';
import { useQuery } from '@tanstack/react-query';
import { matchBookMark, useCreateBookMarkMutation, useDeleteBookMarkMutation } from '../../api/bookmark';
import { BookMarkType } from '../../supabase/database.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/config/configStore';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { openModal } from '../../redux/modules';
import { icon_bookMark_empty, icon_bookMark_full } from '../../assets';

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
      dispatch(openModal({ type: 'alert', message: '로그인 후 이용해주세요' }));
      return null;
    }

    const newBookMark: BookMarkType = {
      liked_id: id || '',
      user_id: loginUser?.id || '',
    };

    if (!isBookMark) {
      await bookMarkCreateMutation.mutate(newBookMark);
    } else {
      await bookMarkDeleteMutation.mutate(id);
    }
  };

  if (isError) {
    console.log('supabase Error', error);
    return null;
  }

  return <button onClick={() => handleToggleBookMark()}> {isBookMark ? <S.Icon src={icon_bookMark_full} /> : <S.Icon src={icon_bookMark_empty} />} </button>;
};

export default BookMark;
