import supabase from '../supabase';

export const getAllMatchCount = async () => {
  const { count, error } = await supabase.from('matching').select('*', { count: 'estimated', head: true }).eq('matched', true);
  if (error) throw error;
  return count;
};
export const getMatchData = async () => {
  const { data: matching, error } = await supabase.from('matching').select();
  if (error) throw error;
  return matching;
};

//조인한 매칭 테이블 전체
export const matchingTutorData = async () => {
  const { data, error } = await supabase.from('matching_tutor_data').select().order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const matchingRequest = async ({ tutorId, userId }: { tutorId: string; userId: string }) => {
  // 이미 요청된 내역 확인
  const { data, error } = await supabase.from('matching').select().eq('user_id', userId).eq('tutor_id', tutorId).eq('matched', false);
  if (error) {
    throw error;
  }
  if (data.length > 0) {
    throw new Error('이미 요청한 튜터입니다.');

    // 여기서 메세지를 보내줘야하나?
  } else {
    // 요청된 내역이 없을 경우 요청
    const { error: insertError } = await supabase.from('matching').insert([
      {
        user_id: userId,
        tutor_id: tutorId,
        matched: false,
        status: 'request',
      },
    ]);

    if (insertError) {
      throw insertError;
    }
  }
};

export const matchingCancel = async (id: string) => {
  const { error } = await supabase.from('matching').delete().eq('id', id);
  if (error) throw error;
};
export const matchingPending = async (id: string) => {
  const { error } = await supabase
    .from('matching')
    .update({
      status: 'pending',
      matched: false,
    })
    .eq('id', id);
  if (error) throw error;
};
export const matchingAccept = async (id: string) => {
  const { error } = await supabase
    .from('matching')
    .update({
      status: 'pending',
      matched: false,
    })
    .eq('id', id);
  if (error) throw error;
};
export const matchingReject = async (id: string) => {
  const { error } = await supabase
    .from('matching')
    .update({
      status: 'reject',
      matched: true,
    })
    .eq('id', id);
  if (error) throw error;
};
export const matchingRejectStudent = async (id: string) => {
  const { error } = await supabase
    .from('matching')
    .update({
      status: 'reject',
      matched: true,
      refund: 'refundRequest', // null,refundRequest,refundConfirm
    })
    .eq('id', id);
  if (error) throw error;
};
export const matchingComplete = async (id: string) => {
  const { error } = await supabase
    .from('matching')
    .update({
      status: 'complete',
      matched: true,
    })
    .eq('id', id);
  if (error) throw error;
};
export const matchedReview = async (id: string) => {
  const { error } = await supabase
    .from('matching')
    .update({
      review_confirm: true,
    })
    .eq('id', id);
  if (error) throw error;
};
export const tutorMatchedCount = async (id: string) => {
  const { data, error } = await supabase.from('matching').select().match({ tutor_id: id, status: 'complete' });
  if (error) throw error;
  return data;
};
