import supabase from '../supabase';

type Community = {
  title: string;
  content: string;
  user_id?: string;
  category: string;
};

type Edit = {
  title: string;
  content: string;
};
export const WriteInsertApi = async (newInfo: Community) => {
  const { error } = await supabase.from('write').insert(newInfo);

  if (error) throw error;
};

export const editUpdateApi = async (newInfo: Edit, editPostNum: number) => {
  const { error } = await supabase.from('write').update(newInfo).eq('id', editPostNum);

  if (error) throw error;
};
