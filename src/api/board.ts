import supabase from '../supabase';

export const getBoard = async () => {
  const { data, error } = await supabase.from('board').select(
    `
        *,
        profiles(id,username)
        `,
  );
  return data;
};
