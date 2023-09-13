import { Dispatch, SetStateAction } from 'react';
import supabase from '../supabase';

export const getCommunityApi = async (path: string, currentNum: number, pageCount: number, setTotalPageNum: Dispatch<SetStateAction<number | null>>) => {
  const { data, count, error } = await supabase
    .from('write')
    .select(
      `*,
  profiles (id, username, avatar_url)
`,
      { count: 'exact' },
    )
    .order('created_at', { ascending: false })
    .eq('category', path)
    .range((currentNum - 1) * pageCount, currentNum * pageCount - 1);

  setTotalPageNum(count);
  if (error) throw error;
  return data;
};
