import supabase from '../supabase';

export const fetchReview = async () => {
  const res = await supabase.from('review').select('*');
  return res.data;
};

export const getUser = async (email: string | undefined) => {
  const { data } = await supabase.from('profiles').select().eq('email', email).single();
  return data;
};
