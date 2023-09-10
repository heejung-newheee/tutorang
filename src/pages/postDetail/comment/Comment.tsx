import styled from 'styled-components';
import supabase from '../../../supabase';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { detailDate } from '../../community/utility';

const Comment = () => {
  let { postid } = useParams();

  const getApi = async () => {
    const { data, error } = await supabase
      .from('post_comments')
      .select(
        `*,
        profiles (username, avatar_url)
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
        <CommentContainer key={Math.random() * 22229999}>
          <img src={item.profiles?.avatar_url as string} />

          <div>
            <UserName>
              <span>{item.profiles?.username}</span>
              <span>{detailDate(new Date(item.created_at))}</span>
            </UserName>

            <div>{item.comment}</div>
          </div>
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
