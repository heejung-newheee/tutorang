import supabase from '../supabase';

export const fetchTutor = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, tutor] = queryKey;
  const res = await supabase.from('tutor_info').select('*');
  return res.data;
};
