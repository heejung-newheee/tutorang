import supabase from '../supabase';

export const fetchLBookMark = async () => {
  const res = await supabase.from('book_mark').select('*');
  return res.data;
};
