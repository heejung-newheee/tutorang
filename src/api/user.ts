import { v4 } from 'uuid';
import supabase from '../supabase';
import { UpdatingTables } from '../supabase/database.types';

export const fetchReview = async () => {
  const res = await supabase.from('review').select('*');
  return res.data;
};

export const getUser = async (email: string | undefined) => {
  const { data } = await supabase.from('profiles').select().eq('email', email).single();
  return data;
};

export const getUserById = async (id: string) => {
  const { data, error } = await supabase.from('profiles').select().eq('id', id).limit(1).single();
  if (error) throw error;
  return data;
};

export const profileImgUpload = async ({ id, img }: { id: string; img: File }) => {
  try {
    const imgName = v4();
    const imgUpload = await supabase.storage.from('avatars').upload(`profiles/${id}/${imgName}`, img, {
      contentType: 'image/webp',
      cacheControl: 'public, max-age=31536000',
    });

    if (imgUpload.error) throw new Error('프로필 이미지 업로드 실패');

    const { data } = await supabase.storage.from('avatars').getPublicUrl(`profiles/${id}/${imgName}`);

    await supabase.from('profiles').update({ avatar_url: data.publicUrl }).eq('id', id);

    return data.publicUrl;
  } catch (error) {
    console.error('프로필 이미지 업로드 오류:', error);
    throw error;
  }
};

export const userUpdate = async (newData: UpdatingTables<'profiles'>, id: string) => {
  await supabase.from('profiles').update(newData).eq('id', id);
};

export const userUpdateAndGet = async (newData: UpdatingTables<'profiles'>, id: string) => {
  const { data } = await supabase.from('profiles').update(newData).eq('id', id).select().single();
  return data;
};
