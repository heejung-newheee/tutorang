import { Dispatch, SetStateAction } from 'react';
import { COMMENT, DELETECOMMENT, EDITCOMMENT, LikeUpdatePost } from '../@types/PostDetail/PostDetailType';
import supabase from '../supabase';

export const fetchPostData = async (postid: number) => {
  const { data, error } = await supabase.from('write').select(`*, post_like(post_id, user_id),profiles(username,avatar_url)`).eq('id', postid);
  if (error) throw error;
  return data;
};

export const createLike = async (likePost: LikeUpdatePost) => {
  // const writeLikePromise = supabase.from('write').update({ like: likePost.like }).eq('id', likePost.postid).single();
  const writeLikePromise = supabase.rpc('increment_like', {
    post_id: likePost.postid,
  });

  const postLikePromise = supabase.from('post_like').insert({ user_id: likePost.detail_user_id, post_id: Number(likePost.postid) });

  const [writeResult, postLikeResult] = await Promise.all([writeLikePromise, postLikePromise]);

  if (writeResult.error) throw writeResult.error;
  if (postLikeResult.error) throw postLikeResult.error;
};
// let { data, error } = await supabase
//   .rpc('decrement_like', {
//     post_id
//   })

// if (error) console.error(error)
// else console.log(data)
export const updateLike = async (likeUpdate: LikeUpdatePost) => {
  const writeMinusLikePromise = await supabase.rpc('decrement_like', {
    post_id: likeUpdate.postid,
  });
  const postDeletePromise = supabase.from('post_like').delete().eq('user_id', likeUpdate.detail_user_id).eq('post_id', likeUpdate.postid);

  const [writeResult, postLikeResult] = await Promise.all([writeMinusLikePromise, postDeletePromise]);

  if (writeResult.error) throw writeResult.error;
  if (postLikeResult.error) throw postLikeResult.error;
};

export const removePost = async (postid: number) => {
  const post_like_DeletePromise = supabase.from('post_like').delete().eq('post_id', postid);
  const post_comments_DeletePromise = supabase.from('post_comments').delete().eq('post_id', postid);
  const write_DeletePromise = supabase.from('write').delete().eq('id', postid);

  const [post_like_DeleteResult, post_comments_DeleteResult, write_Delete_DeleteResult] = await Promise.all([post_like_DeletePromise, post_comments_DeletePromise, write_DeletePromise]);

  if (post_like_DeleteResult.error) throw post_like_DeleteResult.error;
  if (post_comments_DeleteResult.error) throw post_comments_DeleteResult.error;
  if (write_Delete_DeleteResult.error) throw write_Delete_DeleteResult.error;
};

//comments
export const fetchComments = async (postid: number) => {
  const { data, error } = await supabase
    .from('post_comments')
    .select(
      `*,
      profiles (username, avatar_url)
`,
    )
    .order('created_at', { ascending: false })
    .eq('post_id', postid);
  if (error) throw error;
  return data;
};

//댓글 생성
export const createComment = async (postComment: COMMENT) => {
  const { error } = await supabase.from('post_comments').insert(postComment);

  if (error) throw error;
};

//댓글 수정
export const updateComment = async (editComment: EDITCOMMENT, setisEdit: Dispatch<SetStateAction<number>>) => {
  await supabase.from('post_comments').update({ comment: editComment.comment, created_at: editComment.created_at }).eq('id', editComment.id).single();
  setisEdit(-1);
};

//댓글 삭제
export const deleteComment = async (deleteComment: DELETECOMMENT) => {
  await supabase.from('post_comments').delete().eq('id', deleteComment.comment_id).eq('user_id', deleteComment.user_id).eq('post_id', deleteComment.postid);
};
