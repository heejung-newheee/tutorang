import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../supabase';
import { BookMarkType } from '../supabase/database.types';

export const fetchBookmark = async () => {
  const { data } = await supabase.from('bookmark').select('*');
  return data;
};

export const matchBookMark = async (tutorId: string) => {
  const { data } = await supabase.from('bookmark').select().match({ tutor_id: tutorId });

  return data;
};

export const createBookMark = async (bookMark: BookMarkType) => {
  await supabase.from('bookmark').insert(bookMark).select();
};

export const deleteBookMark = async (tutorId?: string) => {
  await supabase.from('bookmark').delete().match({ tutor_id: tutorId });
};

export const useCreateBookMarkMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(createBookMark, {
    onSuccess: () => {
      queryClient.invalidateQueries(['matchBookMark']);
    },
  });

  return mutation;
};

export const useDeleteBookMarkMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteBookMark, {
    onSuccess: () => {
      queryClient.invalidateQueries(['matchBookMark']);
    },
  });

  return mutation;
};
