import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../supabase';
import { TTutorWithUser, TutorReport } from '../supabase/database.types';

export const getAllTutorCount = async () => {
  const { count, error } = await supabase.from('tutor_info').select('*', { count: 'estimated', head: true });
  if (error) throw error;
  return count;
};
export const getAllTutorInfo = async (id: string) => {
  const { data, error } = await supabase.from('tutor_info').select('*').eq('user_id', id);
  if (error) throw error;
  return data;
};

export const getTutors = async () => {
  const { data, error } = await supabase
    .from('tutor_info')
    .select(
      `
      id,
      tuition_fee_offline,
      tuition_fee_online,
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
      tutor_info: tutor_info(tuition_fee_offline,tuition_fee_online, class_info)
      profiles: profiles(id, username, avatar_url)
      `,
  );
  if (error) throw error;
  return data;
};
export const getTopReviewer = async () => {
  const { data, error } = await supabase.from('tutor_top_reviewer').select().limit(10);
  if (error) throw error;
  return data;
};

export const tutorInfoJoin = async () => {
  const { data, error } = await supabase.from('tutor_info_join').select().eq('role', 'tutor');
  if (error) throw error;
  return data;
};

export const matchTutor = async (tutorId: string) => {
  const { data, error } = await supabase.from('tutor_info_join').select().match({ tutor_id: tutorId }).single();
  if (error) throw error;
  return data;
};

export const tutorReport = async (newReport: TutorReport) => {
  const { data, error } = await supabase.from('report').insert(newReport).select();
  if (error) throw error;
  return data;
};

export const useTutorReport = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((newReport: TutorReport) => tutorReport(newReport), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return mutate;
};
