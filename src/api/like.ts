import supabase from '../supabase';

export const fetchLike = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, like] = queryKey;
  const res = await supabase.from('like').select('*');
  return res.data;
};

// 내가 좋아요한 튜터만 가져오기 -> 나중에 다시
// export const myLikeList = async (id: string | null) => {
//   if (id === null) {
//     return null; // 또는 빈 배열을 반환하는 것도 가능
//   }

//   const { data, error } = await supabase.from('like').select().match({ user_id: id });
//   if (error) throw error;
//   return data;
// };
