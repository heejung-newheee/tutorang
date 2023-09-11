import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { detailDate } from '../../community/utility';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/config/configStore';
import { deleteCommentApi, handleCommentUpdate } from '../../../api/postDetail';
import { useState } from 'react';
import { getCommentsApi } from '../../../api/postDetail';

const Comment = () => {
  const loginUser = useSelector((state: RootState) => state.user.user);
  const [currentEditNum, setCurrentEditNum] = useState(-1);
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

    const form = e.currentTarget;
    const inputElement = form.elements[0] as HTMLInputElement;
    const value = inputElement.value;

    const currentDateTime = new Date();
    const isoFormattedDateTime = currentDateTime.toISOString();

    commentEditMutation.mutate({ comment: value, created_at: isoFormattedDateTime, id: commentId });
  };
  return (
    <>
      {data?.map((item) => (
        <CommentContainer key={Math.random() * 22229999}>
          <img src={item.profiles?.avatar_url as string} />

          <div>
            {currentEditNum === item.id ? (
              <>
                <form onSubmit={(e) => handleEditSubmit(e, item.id)}>
                  <input type="text" autoFocus />
                  <button type="submit">완료</button>
                </form>
                <button onClick={() => setCurrentEditNum(-1)}>취소</button>
              </>
            ) : (
              <>
                <UserName>
                  <span>{item.profiles?.username}</span>
                  <span>{detailDate(new Date(item.created_at))}</span>
                </UserName>
                <div>{item.comment}</div>
              </>
            )}
          </div>

          {item.user_id === loginUser?.id && currentEditNum !== item.id ? <span onClick={() => setCurrentEditNum(item.id)}>edit</span> : null}
          {item.user_id === loginUser?.id && currentEditNum !== item.id ? <span onClick={() => deleteComment(item.id)}>delete</span> : null}
        </CommentContainer>
      ))}
    </>
  );
};

export default Comment;

export const CommentContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 30px 0;
  border-bottom: 1px solid gray;

  display: flex;
  align-items: center;

  & > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 15px;
  }
`;

export const UserName = styled.div`
  margin-bottom: 5px;
  & > span {
    margin-right: 15px;
  }
`;
