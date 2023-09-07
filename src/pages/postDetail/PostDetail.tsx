import React from 'react';
import supabase from '../../supabase';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  let { postid } = useParams();

  const getApi = async () => {
    const { data, error } = await supabase.from('write').select('*').eq('id', postid);
    console.log(data);
    if (error) throw error;
    return data;
  };

  const { isLoading, isError, data } = useQuery(['write'], getApi);

  console.log(data, 'data');
  return (
    <>
      <div>
        {' '}
        PostDetail
        {data !== undefined && data !== null ? <div dangerouslySetInnerHTML={{ __html: `${data[0].content}` }}></div> : null}
      </div>

      <div>
        <input type="text" />
      </div>
      <div>댓글</div>
    </>
  );
};

export default PostDetail;
