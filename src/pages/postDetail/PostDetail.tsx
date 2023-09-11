import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../redux/config/configStore';
import supabase from '../../supabase';
import Comment from './comment/Comment';
import { getWriteData, firstClickLikeApi, updateLike, deletePost } from '../../api/postDetail';
import { detailDate } from '../community/utility';

const PostDetail = () => {
  const [comment, setComment] = useState<string>('');
  const loginUser = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const detail_user_id = loginUser?.id;

  let { postid } = useParams();

  const queryClient = useQueryClient();

  const { data } = useQuery(['write'], () => getWriteData(postid));

  console.log(data, 'data');
  //ㅁㅇㅁㅇㅁㅇㅁㄴㅇㄴ
  const likemutation = useMutation(async (newInfo: any) => firstClickLikeApi(newInfo, postid, detail_user_id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['write']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const updateLikemutation = useMutation(async (newInfo: any) => updateLike(newInfo, postid, detail_user_id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['write']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleLike = () => {
    const LikeUserSameLoginUser = data?.[0].post_like.some((like) => like.user_id === loginUser?.id);

    if (LikeUserSameLoginUser) {
      if (data?.[0].like !== null && data?.[0].like !== undefined) {
        const minusLike = data?.[0].like - 1;
        updateLikemutation.mutate({ like: minusLike });
      }
    } else {
      if (data?.[0].like !== null && data?.[0].like !== undefined) {
        const plusLike = data?.[0].like + 1;
        likemutation.mutate({
          like: plusLike,
        });
      }
    }
  };
  const postApi = async (newInfo: any) => {
    const { error } = await supabase.from('post_comments').insert(newInfo);

    if (error) throw error;
  };
  const postmutation = useMutation(async (newInfo: any) => postApi(newInfo), {
    onSuccess: () => {
      queryClient.invalidateQueries(['post_comments']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postmutation.mutate({
      post_id: postid,
      comment: comment,
      user_id: loginUser?.id,
    });
  };

  const gotoWrite = () => {
    navigate(`../write/edit-community/?q=${postid}`);
  };

  const deletePostAndNavi = () => {
    deletePost(postid);
    // navigate(-1);
  };

  return (
    <Container>
      <TitleWrap>
        <Title>{data && data[0]?.title}</Title>
        <PostuserInfo>
          <PosrUserImg>
            <img src={data && (data[0]?.profiles?.avatar_url as string)} />
            <div>{data && data[0]?.profiles?.username}</div>
          </PosrUserImg>
          <PostDate>
            {data && detailDate(new Date(data[0].created_at))}
            {data && data[0].user_id === loginUser?.id ? <span onClick={gotoWrite}>edit</span> : null}
            {data && data[0].user_id === loginUser?.id ? <span onClick={deletePostAndNavi}>delete</span> : null}
          </PostDate>
        </PostuserInfo>
      </TitleWrap>
      <Line></Line>
      {data !== undefined && data !== null ? <MainComments dangerouslySetInnerHTML={{ __html: `${data[0].content}` }}></MainComments> : null}
      <LikeDiv $Like={data?.[0].post_like.some((like) => like.user_id === loginUser?.id) === true ? true : false}>
        <button onClick={handleLike}>like</button>
        <Placement className="placement">
          <Heart className="heart"></Heart>
        </Placement>
      </LikeDiv>
      <CommentDiv>
        <form onSubmit={handleComment}>
          <InputDiv>
            <input type="text" onChange={(e) => setComment(e.target.value)} />
          </InputDiv>
        </form>
        <Comment />
      </CommentDiv>
    </Container>
  );
};

export default PostDetail;

export const Container = styled.div`
  margin-top: 100px;
`;

export const TitleWrap = styled.div`
  max-width: 1200px;
  padding: 20px;
  margin-bottom: 50px;
  margin: 0 auto;
`;

export const Title = styled.div`
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 25px;
  padding-left: 10px;
  border-left: 1px solid gray;
`;

export const PostuserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PosrUserImg = styled.div`
  display: flex;
  align-items: center;
  & > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

export const PostDate = styled.div`
  font-size: 13px;
  color: gray;
`;

export const MainComments = styled.div`
  max-width: 1200px;
  display: flex;
  margin: 0 auto;
  margin-top: 50px;

  flex-direction: column;
  align-items: center;
  & > p {
    text-align: center;
  }
  & > p > img {
    width: 80%;
  }
`;

export const LikeDiv = styled.div<{ $Like: boolean }>`
  max-width: 1200px;
  margin: 100px auto;
  display: flex;
  justify-content: center;

  & > button {
    border: 1px solid black;
    background-color: ${(props) => (props.$Like === true ? 'red' : 'white')};
  }
`;

export const Line = styled.hr`
  border: 0.5px solid gray;
  width: 100%;
  margin-top: 10px;
`;

export const CommentDiv = styled.div`
  max-width: 1200px;
  margin: 100px auto;
`;

export const InputDiv = styled.div`
  width: 80%;
  height: 60px;
  margin: 50px auto;

  border: 1px solid black;
  & > input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }
`;

export const Heart = styled.div`
  width: 100px;
  height: 100px;
  background: url('https://cssanimation.rocks/images/posts/steps/heart.png') no-repeat;
  background-position: 0 0;
  cursor: pointer;
  transition: background-position 1s steps(28);
  transition-duration: 0s;

  &:active {
    transition-duration: 1s;
    background-position: -2800px 0;
  }
`;

export const Placement = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
