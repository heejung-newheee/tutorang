import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PostCompo from '../postCompo/PostCompo';
import Pagination from '../pagination/Pagination';
import { getCommunityApi } from '../../../api/community';

const QuestionCommunity = () => {
  const [currentNum, setCurrentNum] = useState<number>(1);
  const [hasPageMore, setHasPageMore] = useState<boolean>(true);
  const [totalPageNum, setTotalPageNum] = useState<number | null>(null);
  const pageCount = 5;

  const location = useLocation();
  const path = location.pathname.split('/')[2];

  const { data } = useQuery(['write', currentNum], () => getCommunityApi(path, currentNum, pageCount, setTotalPageNum));

  return (
    <>
      {data?.map((item, index) => (
        <PostCompo key={Math.random() * 22229999} item={item} lastElement={index === data.length - 1} />
      ))}
      <Pagination setCurrentNum={setCurrentNum} setHasPageMore={setHasPageMore} currentNum={currentNum} hasPageMore={hasPageMore} totalPageNum={totalPageNum} pageCount={pageCount} />
    </>
  );
};

export default QuestionCommunity;
