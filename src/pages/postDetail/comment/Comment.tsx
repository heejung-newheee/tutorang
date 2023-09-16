import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { detailDate } from '../../community/utility';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/config/configStore';
import { deleteComment, updateComment } from '../../../api/postDetail';
import { useState } from 'react';
import { fetchComments } from '../../../api/postDetail';
import * as S from './Comment.styled';
import { DELETECOMMENT, EDITCOMMENT } from '../../../@types/PostDetail/PostDetailType';

const Comment = () => {
  const loginUser = useSelector((state: RootState) => state.user.user);
  const [currentEditNum, setCurrentEditNum] = useState(-1);
  const [editComment, setEditComment] = useState<string>('');
  let { postid } = useParams();
  const queryClient = useQueryClient();

  const { data } = useQuery(['post_comments'], () => fetchComments(Number(postid)));

  const commentDeleteMutation = useMutation((newInfo: DELETECOMMENT) => deleteComment(newInfo), {
    onSuccess: () => {
      queryClient.invalidateQueries(['post_comments']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDeleteComment = (comment_id: number) => {
    commentDeleteMutation.mutate({ comment_id, user_id: loginUser?.id, postid: Number(postid) });
  };

  const commentEditMutation = useMutation((editInfo: EDITCOMMENT) => updateComment(editInfo, setCurrentEditNum), {
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
          <S.CommentContainer key={Math.random() * 22229999}>
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
              {item.user_id === loginUser?.id && currentEditNum !== item.id ? <span onClick={() => handleDeleteComment(item.id)}>삭제</span> : null}
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
