import supabase from '../supabase';

export const fetchTutor = async () => {
  const res = await supabase.from('tutor_info').select('*').range(0, 1).eq('user_id', 'fd32cf82-7866-4d4c-90fc-3539ef165556');
  return res.data;
};
