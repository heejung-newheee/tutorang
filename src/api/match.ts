import supabase from '../supabase';

export const getMatchData = async () => {
  const { data: matching, error } = await supabase.from('matching').select();
  if (error) throw error;
  return matching;
};

export const matchingRequest = async ({ tutorId, userId }: { tutorId: string; userId: string }) => {
  const { error } = await supabase
    .from('matching')
    .insert([
      {
        user_id: userId,
        tutor_id: tutorId,
        matching: false,
        status: 'request',
      },
    ])
    .select();
  if (error) throw error;
};

export const matchingCancel = async (id: string) => {
  const { error } = await supabase.from('matching').delete().eq('id', id);
  if (error) throw error;
};

export const matchingAccept = async (id: string) => {
  const { data, error } = await supabase.from('matching').update({ status: 'complete' }).eq('id', id).select();
  if (error) throw error;
};

export const matchingReject = async (id: string) => {
  const { data, error } = await supabase.from('matching').update({ status: 'reject' }).eq('id', id).select();
  if (error) throw error;
};
