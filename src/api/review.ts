import supabase from '../supabase';

export const getAllReviewCount = async () => {
  const { count, error } = await supabase.from('review').select('*', { count: 'estimated', head: true });
  if (error) throw error;
  return count;
};
