import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteCommentApi, getCommentsApi, handleCommentUpdate } from '../../../api/postDetail';
import { RootState } from '../../../redux/config/configStore';
import { detailDate } from '../../community/utility';
import * as S from './Comment.styled';

const Comment = () => {
  const loginUser = useSelector((state: RootState) => state.user.user);
  const [currentEditNum, setCurrentEditNum] = useState(-1);
  const [editComment, setEditComment] = useState<string>('');
  let { postid } = useParams();
  const queryClient = useQueryClient();

  const { data } = useQuery(['post_comments'], () => getCommentsApi(Number(postid)));

  type NEWINFO = {
    comment_id: number;
    user_id: string | null | undefined;
    post_id: number | null;
  };

  const commentDeleteMutation = useMutation(async (newInfo: NEWINFO) => deleteCommentApi(newInfo), {
    onSuccess: () => {
      queryClient.invalidateQueries(['post_comments']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  type EDITINFO = {
    comment: string;
    created_at: string;
    id: number;
  };

  const deleteComment = async (comment_id: number) => {
    commentDeleteMutation.mutate({ comment_id, user_id: loginUser?.id, post_id: Number(postid) });
  };

  const commentEditMutation = useMutation(async (newInfo: EDITINFO) => handleCommentUpdate(newInfo, setCurrentEditNum), {
    onSuccess: () => {
      queryClient.invalidateQueries(['post_comments']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>, commentId: number) => {
    e.preventDefault();
    const currentDateTime = new Date();
    const isoFormattedDateTime = currentDateTime.toISOString();

    commentEditMutation.mutate({ comment: editComment, created_at: isoFormattedDateTime, id: commentId });
  };
  return (
    <>
      <S.CommentLength>
        <span>댓글</span>
        <span>{data?.length}</span>
      </S.CommentLength>
      {data?.map((item) =>
        currentEditNum !== item.id ? (
          <S.CommentContainer key={item.id}>
            <S.UserSection>
              <S.UserImg src={item.profiles?.avatar_url as string} />
              <div>
                <S.UserNameDate>
                  <span>{item.profiles?.username}</span>
                  <span>{detailDate(new Date(item.created_at))}</span>
                </S.UserNameDate>
                <div>{item.comment}</div>
              </div>
            </S.UserSection>

            <S.EditSection>
              {item.user_id === loginUser?.id && currentEditNum !== item.id ? <span onClick={() => setCurrentEditNum(item.id)}>수정</span> : null}
              {item.user_id === loginUser?.id && currentEditNum !== item.id ? <span onClick={() => deleteComment(item.id)}>삭제</span> : null}
            </S.EditSection>
          </S.CommentContainer>
        ) : (
          <S.EditContainer>
            <S.UserImg src={item.profiles?.avatar_url as string} />

            <S.EditDiv>
              <form onSubmit={(e) => handleEditSubmit(e, item.id)}>
                <S.EditInputDiv>
                  <input type="text" value={editComment} onChange={(e) => setEditComment(e.target.value)} autoFocus />
                  <button type="submit" disabled={editComment ? false : true}>
                    완료
                  </button>
                </S.EditInputDiv>
              </form>
            </S.EditDiv>
            <button onClick={() => setCurrentEditNum(-1)}>취소</button>
          </S.EditContainer>
        ),
      )}
    </>
  );
};

export default Comment;
