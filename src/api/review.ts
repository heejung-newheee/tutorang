import supabase from '../supabase';
import { reviews } from '../supabase/database.types';

export const getAllReviewCount = async () => {
  const { count, error } = await supabase.from('review').select('*', { count: 'estimated', head: true });
  if (error) throw error;
  return count;
};

/** review create */
export const reviewRequest = async (newReview: reviews) => {
  const { error } = await supabase.from('review').insert(newReview).select();
  if (error) throw error;
};

export const reviewDelete = async (id: number) => {
  const { error } = await supabase.from('review').delete().eq('id', id).select();
  if (error) throw error;
};
