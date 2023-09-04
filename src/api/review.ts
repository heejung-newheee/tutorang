import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../supabase';
import { reviews } from '../supabase/database.types';

const REVIEW_TABLE = 'review';
const REVIEW_QUERY_KEY = ['reviewTutorDetail'];

export const getAllReviewCount = async () => {
  const { count, error } = await supabase.from(REVIEW_TABLE).select('*', { count: 'estimated', head: true });
  if (error) throw error;
  return count;
};

export const getWriteReviewCount = async (id: string) => {
  const { count, error } = await supabase.from(REVIEW_TABLE).select('*', { count: 'estimated', head: true }).eq('user_id', id);

  if (error) throw error;
  return count;
};
export const getReceivedWriteReviewCount = async (id: string) => {
  const { count, error } = await supabase.from(REVIEW_TABLE).select('*', { count: 'estimated', head: true }).eq('reviewed_id', id);

  if (error) throw error;
  return count;
};

// 해당 게시물(튜터) 리뷰 데이터만 조회
export const matchReview = async (tutorId: string) => {
  const { data, error } = await supabase.from(REVIEW_TABLE).select(`*`).eq('reviewed_id', tutorId);
  if (error) throw error;
  return data;
};

// 내가 쓴 리뷰 데이터만 조회
export const matchMyReview = async (id: string) => {
  const { data, error } = await supabase
    .from(REVIEW_TABLE)
    .select(
      `*,
      reviewed_id (profiles: id, username)
    `,
    )
    .eq('user_id', id);
  if (error) throw error;
  return data;
};

/** review create */
export const reviewRequest = async (newReview: reviews) => {
  const { error } = await supabase.from(REVIEW_TABLE).insert(newReview).select();
  if (error) throw error;
};

/** review delete */
export const reviewDelete = async (id: number) => {
  const { error } = await supabase.from(REVIEW_TABLE).delete().eq('id', id).select();
  if (error) throw error;
};

/** review update */
export const reviewUpdate = async ({ updatedReview, id }: { updatedReview: reviews; id: number }) => {
  const { data, error } = await supabase.from(REVIEW_TABLE).update(updatedReview).eq('id', id).select();
  if (error) throw error;

  return data;
};

//** mutation Review : optimistic Update 적용 */
export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(reviewRequest, {
    onMutate: async (newReviewData) => {
      await queryClient.cancelQueries(REVIEW_QUERY_KEY);

      const previousReview = queryClient.getQueryData(REVIEW_QUERY_KEY);
      queryClient.setQueriesData(REVIEW_QUERY_KEY, (old: any) => [...old, newReviewData]);

      return { previousReview };
    },

    onError: (error, _, context) => {
      console.log(error);
      queryClient.setQueriesData(REVIEW_QUERY_KEY, context?.previousReview);
    },

    onSettled: () => {
      queryClient.invalidateQueries(REVIEW_QUERY_KEY);
    },
  });

  return mutation;
};
