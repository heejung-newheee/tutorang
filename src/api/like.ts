import supabase from '../supabase';

export const fetchLike = async () => {
  const res = await supabase.from('like').select('*');
  return res.data;
};
