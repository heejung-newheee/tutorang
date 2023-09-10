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

export const changeStateTutorApply = async (_state: string, id: number) => {
  const { data, error } = await supabase.from(PENDING_TUTOR_REGISTRATION_TABLE).update({ state: _state }).eq('id', id);
  if (error) throw error;
  return data;
};
