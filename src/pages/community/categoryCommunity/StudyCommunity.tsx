import { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import supabase from '../../../supabase';
import { useQuery } from '@tanstack/react-query';
import PostCompo from '../postCompo/PostCompo';
import { handlePrev, handleNext, handleTotalNext, handleCurrentOne } from '../utility';

const StudyCommunity = () => {
  const [currentNum, setCurrentNum] = useState<number>(1);
  const [hasPageMore, setHasPageMore] = useState<boolean>(true);
  const [totalPageNum, setTotalPageNum] = useState<number | null>(null);
  const pageCount = 5;

  const location = useLocation();
  const path = location.pathname.split('/')[2];

  const getApi = async () => {
    const { data, count, error } = await supabase
      .from('write')
      .select(
        `*,
    user_id (profiles: id, username, avatar_url)
  `,
        { count: 'exact' },
      )
      .eq('category', path)
      .range((currentNum - 1) * pageCount, currentNum * pageCount - 1);

    setTotalPageNum(count);
    console.log(data?.length, 'data?.length');

    if (error) throw error;
    return data;
  };

  const { data } = useQuery(['write'], getApi);

  return (
    <>
      {data?.map((item, index) => (
        <PostCompo key={index} item={item} lastElement={index === data.length - 1} />
      ))}
      <Pagination>
        {currentNum !== 1 && <div onClick={() => handleCurrentOne(setCurrentNum, setHasPageMore)}>vv</div>}
        <div onClick={() => handlePrev(currentNum, setCurrentNum, setHasPageMore)}>pre</div>

        {currentNum !== 1 && <div>{currentNum - 1}</div>}
        <NumberDiv> {currentNum}</NumberDiv>
        {hasPageMore && <div>{currentNum + 1}</div>}
        {hasPageMore && <div>.....30</div>}

        <div onClick={() => handleNext(currentNum, totalPageNum, setCurrentNum, setHasPageMore)}>nex</div>
        <div onClick={() => handleTotalNext(totalPageNum, setCurrentNum, setHasPageMore)}>vv</div>
      </Pagination>
    </>
  );
};

export default StudyCommunity;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: -30px;
`;

export const PostBtn = styled.button`
  position: absolute;
  right: 0;
  bottom: -30px;
`;

export const NumberDiv = styled.div`
  margin: 0 10px;
  background-color: aqua;
  border: 1px solid gray;
`;
