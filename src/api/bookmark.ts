import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../supabase';
import { BookMarkType } from '../supabase/database.types';

const LIKE_TABLE = 'like';
const BOOKMARK_QUERY_KEY = ['matchBookMark'];

export const matchBookMark = async (tutorId: string) => {
  const { data } = await supabase.from(LIKE_TABLE).select().match({ liked_id: tutorId });
  return data;
};

export const createBookMark = async (bookMark: BookMarkType) => {
  await supabase.from(LIKE_TABLE).insert(bookMark).select();
};

export const deleteBookMark = async (tutorId?: string) => {
  await supabase.from(LIKE_TABLE).delete().match({ liked_id: tutorId });
};

export const useCreateBookMarkMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(createBookMark, {
    onMutate: async (newBookMark) => {
      await queryClient.cancelQueries(BOOKMARK_QUERY_KEY);

      const previousBookMark = queryClient.getQueryData(BOOKMARK_QUERY_KEY);
      queryClient.setQueriesData(BOOKMARK_QUERY_KEY, (old: any) => [...old, newBookMark]);

      return { previousBookMark };
    },

    onError: (error, _, context) => {
      console.log(error);
      queryClient.setQueriesData(BOOKMARK_QUERY_KEY, context?.previousBookMark);
    },

    onSettled: () => {
      queryClient.invalidateQueries(BOOKMARK_QUERY_KEY);
    },
  });

  return mutation;
};

export const useDeleteBookMarkMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteBookMark, {
    onMutate: async (newBookMark) => {
      await queryClient.cancelQueries(BOOKMARK_QUERY_KEY);
      const previousBookMark = queryClient.getQueryData(BOOKMARK_QUERY_KEY);
      queryClient.setQueriesData(BOOKMARK_QUERY_KEY, (old: any) => [...old, newBookMark]);

      return { previousBookMark };
    },

    onError: (error, _, context) => {
      console.log(error);
      queryClient.setQueriesData(BOOKMARK_QUERY_KEY, context?.previousBookMark);
    },

    onSettled: () => {
      queryClient.invalidateQueries(BOOKMARK_QUERY_KEY);
    },
  });

  return mutation;
};
