export type COMMENT = {
  post_id: number;
  comment: string;
  user_id: string | null;
};

export type EDITCOMMENT = {
  comment: string;
  created_at: string;
  id: number;
};

export type DELETECOMMENT = {
  comment_id: number;
  user_id: string | null | undefined;
  postid: number | null;
};

export type LikeUpdatePost = {
  like: number;
  postid: number;
  detail_user_id: string | undefined;
};
