import React from 'react';
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StudyCommunity from './StudyCommunity';
import supabase from '../../supabase';
import { useQuery } from '@tanstack/react-query';
import FreeCommunity from './FreeCommunity';

const Community = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const path = location.pathname.split('/')[2];

  // const getApi = async () => {
  //   const { data, error } = await supabase.from('write').select('*');
  //   console.log(data);
  //   if (error) throw error;
  //   return data;
  // };

  // const { data } = useQuery(['write'], getApi);

  // console.log(data, 'data');

  const gotoWrite = () => {
    navigate(`../write/${path}`);
  };
  return (
    <CommunityContainer>
      <CommunityTitle>asdsa</CommunityTitle>
      <PostContainer>
        <Category>
          <div onClick={() => navigate('free')}>자유게시판</div>
          <div onClick={() => navigate('question')}>질문게시판</div>
          <div onClick={() => navigate('study')}>학습 정보 게시판</div>
          <div onClick={() => navigate('region')}>지역별 게시판</div>
        </Category>
        <PostsContainer>
          <Outlet />
          {/* <Post> */}
          {/* main */}
          {/* <UserWrite>
              <div>img</div>
              <div>main post</div>
              <div>좋아요, 댓글</div>
            </UserWrite>
            <UserImg>asd</UserImg> */}
          {/* </Post> */}
        </PostsContainer>
      </PostContainer>
      <Pagination>
        <div>pre</div>
        <div>1</div>

        <div>2</div>
        <div>3</div>

        <div>nex</div>
      </Pagination>
      <PostBtn onClick={gotoWrite}>asdadas</PostBtn>
    </CommunityContainer>
  );
};

export default Community;

export const CommunityContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 1px solid black;
  position: relative;
`;

export const CommunityTitle = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: aqua;
`;
export const PostContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #aabb50;
`;

export const Category = styled.div`
  width: 200px;
  background-color: #bb9b50;

  & > div {
    padding: 10px;
    border: 1px solid black;
  }
`;

export const PostsContainer = styled.div`
  width: calc(100% - 15%);
  background-color: #508ebb;
`;

export const Post = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  border: 1px solid black;

  background-color: #8dbb50;
`;

export const UserWrite = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #50bba7;
`;

export const UserImg = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5e50bb;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
`;

export const PostBtn = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
`;
