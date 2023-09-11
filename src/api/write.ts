import supabase from '../supabase';

const PAGE_LIMIT = 10;

type FilterType = {
  category: string;
  searchFilter: string;
  searchWord: string;
  startDate: string;
  endDate: string;
};

const addOneDayToDate = (dateString: string) => {
  // 입력된 날짜 문자열을 Date 객체로 변환
  const date = new Date(dateString);

  // 1일을 더함
  date.setDate(date.getDate() + 1);

  // YYYY-MM-DD 형식의 문자열로 변환하여 반환
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 두 자릿수로 포맷
  const day = String(date.getDate()).padStart(2, '0'); // 일자를 두 자릿수로 포맷

  return year + '-' + month + '-' + day;
};

export const getBoardList = async (page: number, filter: FilterType) => {
  let query = supabase.from('write').select('*, profiles(id,username,email,avatar_url)', { count: 'exact', head: false });
  if (filter.category !== 'all') query = query.eq('category', filter.category);
  if (filter.searchWord) {
    if (filter.searchFilter === 'title') query = query.like('title', `%${filter.searchWord}%`);
    else if (filter.searchFilter === 'content') query = query.like('content', `%${filter.searchWord}%`);
    else if (filter.searchFilter === 'writer') query = query.like('profiles.username', `%${filter.searchWord}%`);
  }

  if (filter.startDate) query = query.gte('created_at', filter.startDate);
  if (filter.endDate) query = query.lte('created_at', addOneDayToDate(filter.endDate));

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
