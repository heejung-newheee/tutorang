import supabase from '../supabase';

export const WriteInsertApi = async (newInfo: any) => {
  const { error } = await supabase.from('write').insert(newInfo);

  if (error) throw error;
};

export const editUpdateApi = async (newInfo: any, editPostNum: number) => {
  const { error } = await supabase.from('write').update(newInfo).eq('id', editPostNum);

  if (error) throw error;
};
