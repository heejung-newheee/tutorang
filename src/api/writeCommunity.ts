import { EDITWRITE, POSTWRITE } from '../@types/writeCommunity/WriteCommunity.type';
import supabase from '../supabase';

export const updateWrite = async (postWrite: POSTWRITE) => {
  const { error } = await supabase.from('write').insert(postWrite);

  if (error) throw error;
};

export const updateEditedWrite = async (editWrite: EDITWRITE, editPostNum: number) => {
  const { error } = await supabase.from('write').update(editWrite).eq('id', editPostNum);

  if (error) throw error;
};
