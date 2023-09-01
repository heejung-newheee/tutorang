import supabase from '../supabase';

export const fetchData = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, profiles] = queryKey;
  const res = await supabase.from('profiles').select('*');
  return res.data;
};

export const fetchReview = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, review] = queryKey;
  const res = await supabase.from('review').select('*');
  return res.data;
};

export const getUser = async (email: string | undefined) => {
  const { data } = await supabase.from('profiles').select().eq('email', email).single();
  return data;
};
