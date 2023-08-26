import supabase from '../supabase';
import { TTutorWithUser } from '../supabase/database.types';

export const getAllTutorCount = async () => {
  const { count, error } = await supabase.from('tutor_info').select('*', { count: 'estimated', head: true });
  if (error) throw error;
  return count;
};

export const getTutors = async () => {
  const { data, error } = await supabase
    .from('tutor_info')
    .select(
      `
      id,
      price,
      class_info,
      profiles: profiles(id, username, avatar_url)
      `,
    )
    .limit(3)
    .returns<TTutorWithUser[]>();
  if (error) throw error;
  return data;
};

export const getTutorMostReview = async () => {
  const { data, error } = await supabase.from('most_review_tutor').select(
    `
      id,
      tutor_info: tutor_info(price, class_info)
      profiles: profiles(id, username, avatar_url)
      `,
  );
  if (error) throw error;
  return data;
};

export const fetchTutorAll = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, tutor] = queryKey;
  const res = await supabase.from('tutor_info').select('*');
  return res.data;
};

export const fetchTutorFilter = async () => {
  const res = await supabase.from('tutor_info').select('*').range(0, 1).eq('user_id', 'fd32cf82-7866-4d4c-90fc-3539ef165556');
  return res.data;
};
export const tutorInfoMatched = async () => {
  const { data, error } = await supabase.from('tutor_info_join').select();
  if (error) throw error;
  return data;
};
