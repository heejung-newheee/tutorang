import supabase from '../supabase';

export const getPendingTutorRegistInfo = async (authId: string | undefined) => {
  const { data } = await supabase.from('pending_tutor_registration').select().eq('user_id', authId).single();
  return data;
};