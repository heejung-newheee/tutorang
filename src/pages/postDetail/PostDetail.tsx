import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../redux/config/configStore';
import supabase from '../../supabase';
import Comment from './comment/Comment';

const PostDetail = () => {
  const [comment, setComment] = useState<string>('');
  let { postid } = useParams();

  const getApi = async () => {
    const { data, error } = await supabase.from('write').select('*').eq('id', postid);
    console.log(data);
    if (error) throw error;
    return data;
  };

  const { data } = useQuery(['write'], getApi);

  console.log(data, 'data');

  const loginUser = useSelector((state: RootState) => state.user.user);

  const location = useLocation();

  const path = location.pathname.split('/')[2];

  const queryClient = useQueryClient();

  const api = async (newInfo: any) => {
    const { error } = await supabase.from('post_comments').insert(newInfo);

    console.error(error);
    if (error) throw error;
  };

  const mutation = useMutation(async (newInfo: any) => api(newInfo), {
    onSuccess: () => {
      queryClient.invalidateQueries(['post_comments']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({
      post_id: path,
      comment: comment,
      user_id: loginUser?.id,
    });
  };
  return (
    <Container>
      <ContentWrap>
        {' '}
        title
        <div>{data && data[0]?.title}</div>
        {data !== undefined && data !== null ? <MainComments dangerouslySetInnerHTML={{ __html: `${data[0].content}` }}></MainComments> : null}
      </ContentWrap>
      <form onSubmit={handleComment}>
        <div>
          <input type="text" onChange={(e) => setComment(e.target.value)} />
        </div>
      </form>
      <Comment />
    </Container>
  );
};

export default PostDetail;

export const Container = styled.div`
  margin-top: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ContentWrap = styled.div`
  margin-bottom: 200px;
`;

export const MainComments = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  & > p {
    text-align: center;
  }
  & > p > img {
    width: 80%;
  }
`;
