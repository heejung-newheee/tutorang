import supabase from '../supabase';

export const matchingRequest = async ({ tutorId, userId }: { tutorId: string; userId: string }) => {
  // 튜터 아이디를 인자로 받음! -> 요청 받는 사람 tutor_id : id
  console.log(tutorId, userId);

  const { error } = await supabase
    .from('matching')
    .insert([
      {
        user_id: userId,
        tutor_id: tutorId,
        matching: false,
        process: 'request',
      },
    ])
    .select();
  if (error) throw error;

  // const { data, error } = await supabase
  // .from('matching')
  // .update({ other_column: 'otherValue' })
  // .match({ tutor_id: id });
  // .select('process')

  // const { data: oldContents, error: olderror } = await supabase
  //   .from('pins')
  //   .select('contents')
  //   .match({ plan_id: planId, date });
  // const Arr = [];
  // if (oldContents != null) {
  //   Arr.push(...oldContents[0].contents, newContents);
  // }
  // const { data, error } = await supabase
  //   .from('pins')
  //   .update({ contents: Arr as Json[] })
  //   .match({ plan_id: planId, date })
  //   .select();
  // if (data?.length !== 0) {
  //   console.log('pins contents 추가됨', data);
  // }
  // if (error != null || olderror != null) {
  //   console.log('olderror', olderror);
  //   console.log(error);
  // }
};
