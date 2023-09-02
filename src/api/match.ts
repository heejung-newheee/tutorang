import supabase from '../supabase';

export const getMatchData = async () => {
  const { data: matching, error } = await supabase.from('matching').select();
  if (error) throw error;
  return matching;
};

//조인한 매칭 테이블 전체
export const matchingTutorData = async () => {
  const { data, error } = await supabase.from('matching_tutor_data').select();
  if (error) throw error;
  return data;
};

export const matchingRequest = async ({ tutorId, userId }: { tutorId: string; userId: string }) => {
  const { error } = await supabase
    .from('matching')
    .insert([
      {
        user_id: userId,
        tutor_id: tutorId,
        matched: false,
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
  const { error } = await supabase
    .from('matching')
    .update({
      status: 'complete',
      matched: true,
    })
    .eq('id', id);
  if (error) throw error;
};

export const matchingReject = async (id: string) => {
  const { error } = await supabase.from('matching').update({ status: 'reject' }).eq('id', id);
  if (error) throw error;
};

export const tutorMatchedCount = async (id: string) => {
  const { data, error } = await supabase.from('matching').select().match({ tutor_id: id, status: 'complete' });
  if (error) throw error;
  return data;
};
