import supabase from '../supabase';

export const getBoard = async () => {
  const { data } = await supabase.from('board').select(
    `
        *,
        profiles(id,username)
        `,
  );
  return data;
};
