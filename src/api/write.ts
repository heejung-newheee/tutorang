import supabase from '../supabase';
import { addOneDayToDate } from '../utils/Date';

const PAGE_LIMIT = 10;

type FilterType = {
  category: string;
  searchFilter: string;
  searchWord: string;
  startDate: string;
  endDate: string;
};

type SortType = {
  date: string;
};

export const getBoardList = async (page: number, filter: FilterType, sort: SortType) => {
  let query = supabase.from('write').select('*, profiles(id,username,email,avatar_url)', { count: 'exact', head: false });

  if (filter.category !== 'all') query = query.eq('category', filter.category);
  if (filter.searchWord) {
    if (filter.searchFilter === 'title') query = query.like('title', `%${filter.searchWord}%`);
    else if (filter.searchFilter === 'content') query = query.like('content', `%${filter.searchWord}%`);
    else if (filter.searchFilter === 'writer') query = query.like('profiles.username', `%${filter.searchWord}%`);
  }

  if (filter.startDate) query = query.gte('created_at', filter.startDate);
  if (filter.endDate) query = query.lte('created_at', addOneDayToDate(filter.endDate));

  query = query.order('created_at', { ascending: sort.date === 'asc' });

  const { data, error, count: totalCount } = await query.range((page - 1) * PAGE_LIMIT, page * PAGE_LIMIT - 1);

  if (error) throw error;
  if (!data) throw new Error('data is null');
  if (totalCount === null) throw new Error('count is null');

  const count = data.length;
  const currentPage = page;
  const hasNextPage = totalCount > page * PAGE_LIMIT;
  const hasPreviousPage = page > 1;
  const lastPage = Math.ceil(totalCount / PAGE_LIMIT);
  const rowsPerPage = PAGE_LIMIT;

  return { data, count, totalCount, currentPage, hasNextPage, hasPreviousPage, lastPage, rowsPerPage };
};

export const deleteABoard = async (id: number) => {
  const { error } = await supabase.from('write').delete().eq('id', id);
  if (error) throw error;
};
export const getMyBoardList = async (id: string) => {
  const { data, error } = await supabase.from('write').select('*, profiles(id,username,email,avatar_url)').eq('user_id', id).order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};
