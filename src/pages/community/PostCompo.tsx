import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import supabase from '../../supabase';
import { useNavigate } from 'react-router-dom';

type Props = {
  item: {
    category: string | null;
    content: string | null;
    created_at: string;
    id: number;
    title: string | null;
    user_id: string | null;
  };
};

const PostCompo = ({ item }: Props) => {
  const [mainText, setMainText] = useState('');
  const navigate = useNavigate();

  const getUserInfo = async () => {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', item?.user_id);
    console.log(data, error);

    let textOnly = item.content?.replace(/<[^>]+>/g, ' ');

    let cleanText = textOnly?.replace(/\s+/g, ' ');

    if (cleanText) {
      setMainText(cleanText);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Post onClick={() => navigate(`/post/${item.id}`)}>
      <UserWrite>
        <div>{item.title}</div>
        <div>{mainText}</div>
        <div>좋아요, 댓글</div>
      </UserWrite>
      <UserImg>asd</UserImg>
    </Post>
  );
};

export default PostCompo;

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
