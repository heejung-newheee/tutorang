import React from 'react';
import { useLocation } from 'react-router-dom';
import supabase from '../../supabase';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import PostCompo from './PostCompo';

const QuestionCommunity = () => {
  const location = useLocation();

  const path = location.pathname.split('/')[2];

  const getApi = async () => {
    const { data, error } = await supabase.from('write').select('*').eq('category', path);
    console.log(data);
    if (error) throw error;
    return data;
  };

  const { data } = useQuery(['write'], getApi);

  console.log(data, 'data');
  return (
    <>
      {data?.map((item, index) => (
        <PostCompo key={index} item={item} />
      ))}
    </>
  );
};

export default QuestionCommunity;

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
