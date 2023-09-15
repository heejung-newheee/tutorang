import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import Heart from 'react-animated-heart';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePost, firstClickLikeApi, getPostData, putCommentApi, updateLike } from '../../api/postDetail';
import { Loading } from '../../components';
import { AppDispatch, RootState } from '../../redux/config/configStore';
import { displayToastAsync } from '../../redux/modules';
import { detailDate } from '../community/utility';
import * as S from './PostDetail.styled';
import Comment from './comment/Comment';
import { PostUpdate } from '../../@types/PostDetail/PostDetailType';

const PostDetail = () => {
  const [comment, setComment] = useState<string>('');
  const [isThrottled, setIsThrottled] = useState(false);
  const loginUser = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const detail_user_id = loginUser?.id;

  let { postid } = useParams();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(['write'], () => getPostData(Number(postid)));

  //좋아요 데이터가 없을때
  const likemutation = useMutation(async (newInfo: { like: number }) => firstClickLikeApi(newInfo, Number(postid), detail_user_id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['write']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  //좋아요 데이터가 있을떄
  const updateLikemutation = useMutation(async (newInfo: { like: number }) => updateLike(newInfo, Number(postid), detail_user_id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['write']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleLike = () => {
    if (!loginUser) {
      return dispatch(displayToastAsync({ id: Date.now(), type: 'info', message: '로그인 후 이용해주세요' }));
    }
    if (isThrottled) {
      return;
    }
    const LikeUserSameLoginUser = data?.[0].post_like.some((like) => like.user_id === loginUser?.id);

    setIsThrottled(true);
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
    setTimeout(() => {
      setIsThrottled(false);
    }, 500);
  };

  //댓글 생성
  const postCommentMutation = useMutation(async (postInfo: PostUpdate) => putCommentApi(postInfo), {
    onSuccess: () => {
      queryClient.invalidateQueries(['post_comments']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  //댓글 삭제
  const deletePostAndNavi = () => {
    deletePostMutation.mutate(Number(postid));
    navigate(-1);
  };

  //댓글 삭제
  const deletePostMutation = useMutation(async (deleteIdNum: number) => deletePost(deleteIdNum), {
    onSuccess: () => {
      queryClient.invalidateQueries(['write']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  //댓글 생성
  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginUser) {
      return dispatch(displayToastAsync({ id: Date.now(), type: 'info', message: '로그인 후 이용해주세요' }));
    }
    postCommentMutation.mutate({
      post_id: Number(postid),
      comment: comment,
      user_id: loginUser?.id,
    });

    setComment('');
  };

  const gotoEdit = () => {
    navigate(`../write/edit-community/?q=${postid}`);
  };

  const isLikeTrue = data?.[0].post_like?.some((like) => like.user_id === loginUser?.id);

  if (isLoading) {
    return <Loading />;
  }
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
            {data && data[0].user_id === loginUser?.id ? <span onClick={gotoEdit}>edit</span> : null}
            {data && data[0].user_id === loginUser?.id ? <span onClick={deletePostAndNavi}>delete</span> : null}
          </S.PostDate>
        </S.PostuserInfo>
      </S.TitleWrap>
      <S.Line />
      {data !== undefined && data !== null ? <S.MainComments dangerouslySetInnerHTML={{ __html: `${data[0].content}` }}></S.MainComments> : null}
      <S.LikeDiv>
        <span>
          <Heart isClick={isLikeTrue !== undefined && isLikeTrue} onClick={handleLike} />
        </span>
        <div>{data && data[0]?.like}</div>
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
