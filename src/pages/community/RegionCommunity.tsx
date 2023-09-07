import React from 'react';
import { useLocation } from 'react-router-dom';
import supabase from '../../supabase';
import { useQuery } from '@tanstack/react-query';

const RegionCommunity = () => {
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
  return <div>RegionCommunity</div>;
};

export default RegionCommunity;
