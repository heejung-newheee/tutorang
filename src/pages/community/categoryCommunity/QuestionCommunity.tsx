import { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import supabase from '../../../supabase';
import { useQuery } from '@tanstack/react-query';
import PostCompo from '../postCompo/PostCompo';
import { handlePrev, handleNext, handleTotalNext, handleCurrentOne } from '../utility';

const QuestionCommunity = () => {
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
    console.log(data, 'asdadads');
    if (error) throw error;
    return data;
  };

  const { data } = useQuery(['write', currentNum], getApi);

  return (
    <>
      {data?.map((item, index) => (
        <PostCompo key={Math.random() * 22229999} item={item} lastElement={index === data.length - 1} />
      ))}
      <Pagination>
        {/* {currentNum !== 1 && <LessGreaterThan onClick={() => handleCurrentOne(setCurrentNum, setHasPageMore)}>&laquo;</LessGreaterThan>} */}
        <LessGreaterThan onClick={() => handleCurrentOne(setCurrentNum, setHasPageMore)}>&laquo;</LessGreaterThan>
        <LessGreaterThan onClick={() => handlePrev(currentNum, setCurrentNum, setHasPageMore)}>&lsaquo;</LessGreaterThan>

        <PageNmberDiv>
          {currentNum !== 1 && <div>{currentNum - 1}</div>}
          <CurrentNumberDiv> {currentNum}</CurrentNumberDiv>
          {hasPageMore && <div>{currentNum + 1}</div>}

          {hasPageMore && <TotalPageNum> &hellip; {totalPageNum && Math.ceil(totalPageNum / pageCount)}</TotalPageNum>}
        </PageNmberDiv>

        <>{console.log(hasPageMore && hasPageMore)}</>
        <LessGreaterThan onClick={() => handleNext(currentNum, totalPageNum, setCurrentNum, setHasPageMore)}> &rsaquo;</LessGreaterThan>
        <LessGreaterThan onClick={() => handleTotalNext(totalPageNum, setCurrentNum, setHasPageMore)}> &raquo;</LessGreaterThan>
      </Pagination>
    </>
  );
};

export default QuestionCommunity;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  color: gray;
  gap: 10px;
  left: 50%;
  position: absolute;
  bottom: -50px;
  transform: translate(-50%, 0);
`;
export const LessGreaterThan = styled.div`
  font-size: 25px;
  cursor: pointer;

  &:hover {
    color: #8aff7f;
  }
`;

export const PostBtn = styled.button`
  position: absolute;
  right: 0;
  bottom: -30px;
`;

export const CurrentNumberDiv = styled.div`
  width: 25px;
  height: 25px;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: white;
  border: none;
  border-radius: 3px;
  background-color: #baff81;
  cursor: pointer;
`;

export const PageNmberDiv = styled.div`
  width: 120px;
  margin: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TotalPageNum = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
`;
