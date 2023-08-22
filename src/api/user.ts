import supabase from '../supabase';

export const fetchData = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, user] = queryKey;
  const res = await supabase.from('user').select('*');
  return res.data;
};

export const fetchLike = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, like] = queryKey;
  const res = await supabase.from('like').select('*');
  return res.data;
};

export const fetchTutor = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, tutor] = queryKey;
  const res = await supabase.from('tutor_info').select('*');
  return res.data;
};

export const fetchReview = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, review] = queryKey;
  const res = await supabase.from('review').select('*');
  return res.data;
};
