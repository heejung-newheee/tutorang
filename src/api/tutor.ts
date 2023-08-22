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
