import supabase from '../supabase';
import { reviews } from '../supabase/database.types';

export const getAllReviewCount = async () => {
  const { count, error } = await supabase.from('review').select('*', { count: 'estimated', head: true });
  if (error) throw error;
  return count;
};

export const reviewRequest = async (newReview: reviews) => {
  const { error } = await supabase.from('review').insert(newReview).select();
  if (error) throw error;
};
