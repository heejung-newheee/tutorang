import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import supabase from '../../../supabase';
import { useQuery } from '@tanstack/react-query';
import PostCompo from '../postCompo/PostCompo';
import Pagination from '../pagination/Pagination';

const FreeCommunity = () => {
  const [currentNum, setCurrentNum] = useState<number>(1);
  const [hasPageMore, setHasPageMore] = useState<boolean>(true);
  const [totalPageNum, setTotalPageNum] = useState<number | null>(null);
  const location = useLocation();
  const pageCount = 5;

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

    if (error) throw error;
    return data;
  };

  const { data } = useQuery(['write', currentNum], getApi);

  return (
    <>
      {data?.map((item, index) => (
        <PostCompo key={Math.random() * 22229999} item={item} lastElement={index === data.length - 1} />
      ))}
      <Pagination setCurrentNum={setCurrentNum} setHasPageMore={setHasPageMore} currentNum={currentNum} hasPageMore={hasPageMore} totalPageNum={totalPageNum} pageCount={pageCount} />
    </>
  );
};

export default FreeCommunity;
