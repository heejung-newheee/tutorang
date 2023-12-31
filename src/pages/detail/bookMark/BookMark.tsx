import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { matchBookMark, useCreateBookMarkMutation, useDeleteBookMarkMutation } from '../../../api/bookmark';
import { icon_bookMark_empty, icon_bookMark_full } from '../../../assets';
import { MATCH_BOOK_MARK_QUERY_KEY } from '../../../constants/query.constant';
import { RootState } from '../../../redux/config/configStore';
import { openModal } from '../../../redux/modules';
import { BookMarkType } from '../../../supabase/database.types';
import * as S from './BookMark.styled';

const BookMark = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const loginUser = useSelector((state: RootState) => state.user.user);

  const { data: bookMarkList, isError, error } = useQuery(MATCH_BOOK_MARK_QUERY_KEY, () => matchBookMark(id || ''), { enabled: !!id });
  const [isBookMark, setIsBookMark] = useState(false);
  const [isThrottled, setIsThrottled] = useState(false);

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
    if (isThrottled) {
      return;
    }
    const newBookMark: BookMarkType = {
      liked_id: id || '',
      user_id: loginUser?.id || '',
    };
    setIsThrottled(true);

    if (!isBookMark) {
      await bookMarkCreateMutation.mutate(newBookMark);
    } else {
      await bookMarkDeleteMutation.mutate(id);
    }

    setTimeout(() => {
      setIsThrottled(false);
    }, 500);
  };

  if (isError) {
    console.error('supabase Error', error);
    return null;
  }

  if (!id) return;

  return <button onClick={() => handleToggleBookMark()}> {isBookMark ? <S.Icon src={icon_bookMark_full} /> : <S.Icon src={icon_bookMark_empty} />} </button>;
};

export default BookMark;
