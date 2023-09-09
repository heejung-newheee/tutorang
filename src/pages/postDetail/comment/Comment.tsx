import styled from 'styled-components';
import supabase from '../../../supabase';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Comment = () => {
  let { postid } = useParams();

  const getApi = async () => {
    const { data, error } = await supabase
      .from('post_comments')
      .select(
        `*,
    user_id (profiles: id, username)
  `,
      )
      .eq('post_id', postid);

    console.log(data);
    if (error) throw error;
    return data;
  };

  const { data } = useQuery(['post_comments'], getApi);

  console.log(data, 'data');
  return (
    <>
      {data?.map((item) => (
        <CommentContainer>{item.comment}</CommentContainer>
      ))}
    </>
  );
};

export default Comment;

export const CommentContainer = styled.div`
  width: 100%;
  border: 1px solid gray;
`;
