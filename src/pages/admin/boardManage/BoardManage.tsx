import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as S from './BoardManage.styled';
import { BOARD_MANAGEMENT_QUERY_KEY } from '../../../constants/query.constant';
import { useState } from 'react';
import { deleteABoard, getBoardList } from '../../../api/write';

const CATEGORY = {
  all: '전체',
  question: '질문게시판',
  free: '자유게시판',
  study: '학습정보게시판',
  region: '지역별게시판',
};

// what kind search data

const SEARCH_DATA = {
  title: '제목',
  content: '내용',
  writer: '작성자',
};

const MIN_DATE = '2023-01-01';
const MAX_DATE = new Date().toISOString().split('T')[0];

const BoardManage = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    category: 'all',
    searchFilter: 'title',
    searchWord: '',
    startDate: '',
    endDate: '',
  });
  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: [BOARD_MANAGEMENT_QUERY_KEY, page],
    queryFn: () => getBoardList(page, filter),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const mutationDeleteBoard = useMutation(deleteABoard, {
    onSuccess: () => {
      queryClient.invalidateQueries([BOARD_MANAGEMENT_QUERY_KEY, page]);
    },
  });

  const handleDeleteBoard = (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    mutationDeleteBoard.mutate(id);
  };

  if (isLoading) return <div>로딩중...</div>;
  if (isError) {
    console.error(error);
    return <div>에러가 발생했습니다.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    refetch();
  };

  return (
    <S.Layout>
      user-manage
      {/* 필터 */}
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="category-select">카테고리 선택</label>
            <select name="category" id="category-select" onChange={(e) => setFilter((prev) => ({ ...prev, category: e.target.value }))} value={filter.category}>
              {Object.entries(CATEGORY).map(([key, value]) => (
                <option value={key} key={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="search-select">검색 종류</label>
            <select name="search-kind" id="search-select" onChange={(e) => setFilter((prev) => ({ ...prev, searchFilter: e.target.value }))} value={filter.searchFilter}>
              {Object.entries(SEARCH_DATA).map(([key, value]) => (
                <option value={key} key={key}>
                  {value}
                </option>
              ))}
            </select>
            <input type="text" placeholder="검색어를 입력하세요" onChange={(e) => setFilter((prev) => ({ ...prev, searchWord: e.target.value.trim() }))} value={filter.searchWord} />
          </div>
          <div>
            <label htmlFor="start-date">Start date:</label>
            <input type="date" id="start-date" name="start-date" value={filter.startDate} min={MIN_DATE} max={filter.endDate || MAX_DATE} onChange={(e) => setFilter((prev) => ({ ...prev, startDate: e.target.value }))} />
            <label htmlFor="end-date">End date:</label>
            <input type="date" id="end-date" name="end-date" value={filter.endDate} min={filter.startDate || MIN_DATE} max={MAX_DATE} onChange={(e) => setFilter((prev) => ({ ...prev, endDate: e.target.value }))} />
          </div>

          <button type="submit">검색</button>
        </form>
      </div>
      {/* 테이블 */}
      <table>
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">날짜</th>
            <th scope="col">카테고리</th>
            <th scope="col">제목</th>

            <th scope="col">작성자</th>
            <th scope="col">버튼</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item, index) => (
            <tr key={item.id}>
              <td>{data.totalCount - (data.currentPage - 1) * data.rowsPerPage - index}</td>
              <td>{item.created_at.slice(0, 10)}</td>
              <td>{item.category}</td>
              <td>{item.title}</td>

              <td>{item.profiles?.username}</td>
              <td>
                <button>수정</button>
                <button onClick={() => handleDeleteBoard(item.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.hasPreviousPage && <button onClick={() => setPage((prev) => --prev)}>이전페이지</button>}
      <span>{page}</span>
      {data.hasNextPage && <button onClick={() => setPage((prev) => ++prev)}>다음페이지</button>}
    </S.Layout>
  );
};

export default BoardManage;
