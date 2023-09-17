import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DELETECOMMENT, EDITCOMMENT } from '../../../@types/PostDetail/PostDetailType';
import { deleteComment, fetchComments, updateComment } from '../../../api/postDetail';
import { RootState } from '../../../redux/config/configStore';
import { detailDate } from '../../community/utility';
import * as S from './Comment.styled';
// import { openModal } from '../../../redux/modules'

const Comment = () => {
  const loginUser = useSelector((state: RootState) => state.user.user);
  const [currentEditNum, setCurrentEditNum] = useState(-1);
  const [editComment, setEditComment] = useState<string>('');
  // const dispatch = useDispatch<AppDispatch>();
  let { postid } = useParams();
  const queryClient = useQueryClient();

  const { data } = useQuery(['post_comments'], () => fetchComments(Number(postid)));

  // console.log(error);
  const commentDeleteMutation = useMutation((newInfo: DELETECOMMENT) => deleteComment(newInfo), {
    onSuccess: () => {
      queryClient.invalidateQueries(['post_comments']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDeleteComment = (comment_id: number) => {
    // dispatch(openModal({ type: 'confirm', message: '정말로 삭제하시겠습니까?' }));
    if (confirm('삭제하시겠습니까?')) {
      commentDeleteMutation.mutate({ comment_id, user_id: loginUser?.id, postid: Number(postid) });
    }
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
    setEditComment('');
  };
  return (
    <>
      <S.CommentLength>
        <span>댓글</span>
        <span>{data?.length}</span>
      </S.CommentLength>
      {data?.map((item) =>
        currentEditNum !== item.id ? (
          <S.CommentContainer key={`${item.post_id}+${item.id}`}>
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
                  <input type="text" value={editComment} onChange={(e) => setEditComment(e.target.value)} autoFocus maxLength={300} />
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
