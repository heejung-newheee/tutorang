import supabase from '../supabase';

export const fetchLike = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, like] = queryKey;
  const res = await supabase.from('like').select('*');
  return res.data;
};
