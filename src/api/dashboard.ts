import { PENDING_TUTOR_REGISTRATION_TABLE } from '../constants/query.constant';
import supabase from '../supabase';

export const getTutorApplyInfo = async () => {
  const { data, error } = await supabase.from(PENDING_TUTOR_REGISTRATION_TABLE).select(
    `*,
      user_id ( profiles: id, avatar_url, username)
    `,
  );

  if (error) throw error;
  return data;
};

export const changeStateTutorApply = async (state: string, id: number) => {
  const { data, error } = await supabase.from(PENDING_TUTOR_REGISTRATION_TABLE).update({ state: state }).eq('id', id);
  if (error) throw error;
  return data;
};

export const getNewUserCountMonth = async (year: number, month: number) => {
  const { data, error } = await supabase.rpc('get_signup_count_by_month', { year: year, month: month });
  if (error) throw error;
  return data;
};

export const getConvertedTutorCountMonth = async (year: number, month: number) => {
  const { data, error } = await supabase.rpc('get_converted_tutor_count_by_month', { year: year, month: month });
  if (error) throw error;
  return data;
};

export const getMatchingCountMonth = async (year: number, month: number) => {
  const { data, error } = await supabase.rpc('get_matching_count_by_month', { year: year, month: month });
  if (error) throw error;
  return data;
};
