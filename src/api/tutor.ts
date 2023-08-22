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

export const getBoard = async () => {
  const { data, error } = await supabase.from('board').select(
    `
      *,
      profiles(id,username)
      `,
  );
  return data;
};
