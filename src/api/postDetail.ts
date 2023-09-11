import supabase from '../supabase';

export const getWriteData = async (postid: string | undefined) => {
  const { data, error } = await supabase.from('write').select(`*, post_like(post_id, user_id),profiles(username,avatar_url)`).eq('id', postid);

  if (error) throw error;
  return data;
};

export const firstClickLikeApi = async (newInfo: any, postid: string | undefined, detail_user_id: string | undefined) => {
  const writeLikePromise = supabase.from('write').update(newInfo).eq('id', postid).single();
  const postLikePromise = supabase.from('post_like').insert({ user_id: detail_user_id, post_id: Number(postid) });

  const [writeResult, postLikeResult] = await Promise.all([writeLikePromise, postLikePromise]);

  if (writeResult.error) throw writeResult.error;
  if (postLikeResult.error) throw postLikeResult.error;
};

export const updateLike = async (newInfo: { like: number }, postid: string | undefined, detail_user_id: string | undefined) => {
  const writeMinusLikePromise = supabase.from('write').update(newInfo).eq('id', postid).single();
  const postDeletePromise = supabase.from('post_like').delete().eq('user_id', detail_user_id).eq('post_id', postid);

  const [writeResult, postLikeResult] = await Promise.all([writeMinusLikePromise, postDeletePromise]);

  if (writeResult.error) throw writeResult.error;
  if (postLikeResult.error) throw postLikeResult.error;
};

export const deletePost = async (postid: string | undefined) => {
  const post_like_DeletePromise = supabase.from('post_like').delete().eq('post_id', postid);

  const post_comments_DeletePromise = supabase.from('post_comments').delete().eq('post_id', postid);

  const write_DeletePromise = supabase.from('write').delete().eq('id', postid);

  const [post_like_DeleteResult, post_comments_DeleteResult, write_Delete_DeleteResult] = await Promise.all([post_like_DeletePromise, post_comments_DeletePromise, write_DeletePromise]);

  if (post_like_DeleteResult.error) throw post_like_DeleteResult.error;
  if (post_comments_DeleteResult.error) throw post_comments_DeleteResult.error;
  if (write_Delete_DeleteResult.error) throw write_Delete_DeleteResult.error;
};