import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PostCompo from '../postCompo/PostCompo';
import Pagination from '../pagination/Pagination';
import { getCommunityApi } from '../../../api/community';

const RegionCommunity = () => {
  const [query, _] = useSearchParams();
  const editPostNum = Number(query.get('q')) || 1;

  const [totalPageNum, setTotalPageNum] = useState<number | null>(null);
  const pageCount = 5;

  const location = useLocation();
  const path = location.pathname.split('/')[2];

  const { data } = useQuery(['write', editPostNum], () => getCommunityApi(path, editPostNum, pageCount, setTotalPageNum));

  return (
    <>
      {data?.map((item, index) => (
        <PostCompo key={Math.random() * 22229999} item={item} lastElement={index === data.length - 1} />
      ))}
      <Pagination totalPageNum={totalPageNum} pageCount={pageCount} />
    </>
  );
};

export default RegionCommunity;
