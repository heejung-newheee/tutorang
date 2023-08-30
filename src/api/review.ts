import supabase from '../supabase';
import { reviews, updateReviews } from '../supabase/database.types';

export const getAllReviewCount = async () => {
  const { count, error } = await supabase.from('review').select('*', { count: 'estimated', head: true });
  if (error) throw error;
  return count;
};

export const getWriteReviewCount = async (id: string) => {
  const { count, error } = await supabase.from('review').select('*', { count: 'estimated', head: true }).eq('user_id', id);

  if (error) throw error;
  return count;
};
export const getReceivedWriteReviewCount = async (id: string) => {
  const { count, error } = await supabase.from('review').select('*', { count: 'estimated', head: true }).eq('reviewed_id', id);

  if (error) throw error;
  return count;
};
// 해당 게시물(튜터) 리뷰 데이터만 조회
export const matchReview = async (tutorId: string) => {
  const { data } = await supabase.from('review').select().match({ reviewed_id: tutorId });
  return data;
};

/** review create */
export const reviewRequest = async (newReview: reviews) => {
  const { error } = await supabase.from('review').insert(newReview).select();
  if (error) throw error;
};

/** review delete */
export const reviewDelete = async (id: number) => {
  const { error } = await supabase.from('review').delete().eq('id', id).select();
  if (error) throw error;
};

/** review update */
export const reviewUpdate = async ({ updatedReview, id }: { updatedReview: reviews; id: number }) => {
  const { data, error } = await supabase.from('review').update(updatedReview).eq('id', id).select();
  if (error) throw error;

  return data;
};
