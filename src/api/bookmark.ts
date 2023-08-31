import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../supabase';
import { BookMarkType } from '../supabase/database.types';

const LIKE_TABLE = 'like';
const BOOKMARK_QUERY_KEY = ['matchBookMark'];

// 전체 북마크 데이터 조회
export const fetchBookmark = async () => {
  const { data } = await supabase.from(LIKE_TABLE).select('*');
  return data;
};

// 해당 게시물(튜터) 북마크 데이터만 조회
export const matchBookMark = async (tutorId: string) => {
  const { data } = await supabase.from(LIKE_TABLE).select().match({ liked_id: tutorId });
  return data;
};

// 북마크 추가
export const createBookMark = async (bookMark: BookMarkType) => {
  await supabase.from(LIKE_TABLE).insert(bookMark).select();
};

// 북마크 삭제
export const deleteBookMark = async (tutorId?: string) => {
  await supabase.from(LIKE_TABLE).delete().match({ liked_id: tutorId });
};

// 북마크 추가( 리액트쿼리 useMutation 적용 )
export const useCreateBookMarkMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(createBookMark, {
    onMutate: async (newBookMark) => {
      await queryClient.cancelQueries(BOOKMARK_QUERY_KEY);

      const previousBookMark = queryClient.getQueryData(BOOKMARK_QUERY_KEY);
      queryClient.setQueriesData(BOOKMARK_QUERY_KEY, (old: any) => [...old, newBookMark]);

      return { previousBookMark };
    },

    onError: (error, newBookMark, context) => {
      console.log(error);
      queryClient.setQueriesData(BOOKMARK_QUERY_KEY, context?.previousBookMark);
    },

    onSettled: () => {
      queryClient.invalidateQueries(BOOKMARK_QUERY_KEY);
    },
  });

  return mutation;
};

// 북마크 삭제( 리액트쿼리 useMutation 적용 )
export const useDeleteBookMarkMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteBookMark, {
    onMutate: async (newBookMark) => {
      await queryClient.cancelQueries(BOOKMARK_QUERY_KEY);
      const previousBookMark = queryClient.getQueryData(BOOKMARK_QUERY_KEY);
      queryClient.setQueriesData(BOOKMARK_QUERY_KEY, (old: any) => [...old, newBookMark]);

      return { previousBookMark };
    },

    onError: (error, newBookMark, context) => {
      console.log(error);
      queryClient.setQueriesData(BOOKMARK_QUERY_KEY, context?.previousBookMark);
    },

    onSettled: () => {
      queryClient.invalidateQueries(BOOKMARK_QUERY_KEY);
    },
  });

  return mutation;
};
