import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../redux/config/configStore';
import supabase from '../../supabase';
import Comment from './comment/Comment';
import { getWriteData, firstClickLikeApi, updateLike, deletePost } from '../../api/postDetail';
import { detailDate } from '../community/utility';
import Heart from 'react-animated-heart';
import * as S from './PostDetail.styled';

const PostDetail = () => {
  const [comment, setComment] = useState<string>('');
  const loginUser = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const detail_user_id = loginUser?.id;

  let { postid } = useParams();

  const queryClient = useQueryClient();

  const { data } = useQuery(['write'], () => getWriteData(Number(postid)));

  console.log(data, 'data');

  //좋아요 데이터가 없을때
  const likemutation = useMutation(async (newInfo: any) => firstClickLikeApi(newInfo, Number(postid), detail_user_id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['write']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  //업데이트
  const updateLikemutation = useMutation(async (newInfo: any) => updateLike(newInfo, Number(postid), detail_user_id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['write']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleLike = () => {
    if (!loginUser) {
      return alert('로그인 후 이용해주세요');
    }

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

    if (!loginUser) {
      return alert('로그인 후 이용해주세요');
    }
    postmutation.mutate({
      post_id: postid,
      comment: comment,
      user_id: loginUser?.id,
    });

    setComment('');
  };

  const gotoWrite = () => {
    navigate(`../write/edit-community/?q=${postid}`);
  };

  const deletePostAndNavi = () => {
    deletePost(Number(postid));
    navigate(-1);
  };

  return (
    <S.Container>
      <S.TitleWrap>
        <S.Title>{data && data[0]?.title}</S.Title>
        <S.PostuserInfo>
          <S.PosrUserImg>
            <img src={data && (data[0]?.profiles?.avatar_url as string)} />
            <div>{data && data[0]?.profiles?.username}</div>
          </S.PosrUserImg>
          <S.PostDate>
            {data && detailDate(new Date(data[0].created_at))}
            {data && data[0].user_id === loginUser?.id ? <span onClick={gotoWrite}>edit</span> : null}
            {data && data[0].user_id === loginUser?.id ? <span onClick={deletePostAndNavi}>delete</span> : null}
          </S.PostDate>
        </S.PostuserInfo>
      </S.TitleWrap>
      <S.Line />
      {data !== undefined && data !== null ? <S.MainComments dangerouslySetInnerHTML={{ __html: `${data[0].content}` }}></S.MainComments> : null}
      <S.LikeDiv>
        <span>
          <Heart isClick={data?.[0].post_like.some((like) => like.user_id === loginUser?.id) === true ? true : false} onClick={handleLike} />
        </span>
      </S.LikeDiv>
      <S.Line />

      <S.CommentDiv>
        <form onSubmit={handleComment}>
          <S.ImgInputFlexDiv>
            <img src={loginUser?.avatar_url as string} />
            <S.InputDiv>
              <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
              <button disabled={comment ? false : true}>입력</button>
            </S.InputDiv>
          </S.ImgInputFlexDiv>
        </form>
        <Comment />
      </S.CommentDiv>
    </S.Container>
  );
};

export default PostDetail;
