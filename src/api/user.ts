import Resizer from 'react-image-file-resizer';
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

const resizeFile = (file: File, size: number): Promise<File> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      size,
      size,
      'WEBP',
      90,
      0,
      (uri) => {
        resolve(uri as File);
      },
      'file',
    );
  });

// create two number function

export const profileImgUpload = async ({ id, img }: { id: string; img: File }) => {
  try {
    const imgName = v4();
    const avatarImg = await resizeFile(img, 40);
    const imgUpload = await supabase.storage.from('avatars').upload(`profiles/${id}/${imgName}`, avatarImg, {
      contentType: 'image/webp',
      cacheControl: 'public, max-age=31536000',
    });

    if (imgUpload.error) throw new Error('프로필 이미지 업로드 실패');

    const {
      data: { publicUrl: avatar_url },
    } = await supabase.storage.from('avatars').getPublicUrl(`profiles/${id}/${imgName}`);

    //
    const cardImg = await resizeFile(img, 400);
    const cardImageName = imgName + '_card';
    const cardImgUpload = await supabase.storage.from('avatars').upload(`profiles/${id}/${cardImageName}`, cardImg, {
      contentType: 'image/webp',
      cacheControl: 'public, max-age=31536000',
    });

    if (cardImgUpload.error) throw new Error('카드 이미지 업로드 실패');

    const {
      data: { publicUrl: cardImageUrl },
    } = await supabase.storage.from('avatars').getPublicUrl(`profiles/${id}/${cardImageName}`);

    await supabase.from('profiles').update({ avatar_url: avatar_url, cardImage_url: cardImageUrl }).eq('id', id);

    return { avatar_url: avatar_url, cardImage_url: cardImageUrl };
  } catch (error) {
    console.error('프로필 이미지 업로드 오류:', error);
    throw error;
  }
};

export const userUpdate = async (newData: UpdatingTables<'profiles'>, id: string) => {
  await supabase.from('profiles').update(newData).eq('id', id);
};
