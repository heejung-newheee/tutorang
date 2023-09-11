import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as S from './BoardManage.styled';
import { BOARD_MANAGEMENT_QUERY_KEY } from '../../../constants/query.constant';
import { useEffect, useState } from 'react';
import { deleteABoard, getBoardList } from '../../../api/write';
import { GoArrowRight } from 'react-icons/go';
import { LiaArrowUpSolid, LiaArrowDownSolid } from 'react-icons/lia';

type CategoryType = 'all' | 'question' | 'free' | 'study' | 'region';

const CATEGORY = {
  all: '전체',
  question: '질문게시판',
  free: '자유게시판',
  study: '학습정보게시판',
  region: '지역별게시판',
};

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
  const [sort, setSort] = useState({
    date: 'asc',
  });
  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: [BOARD_MANAGEMENT_QUERY_KEY, page],
    queryFn: () => getBoardList(page, filter, sort),
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

  useEffect(() => {
    refetch();
  }, [sort, refetch]);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) {
    console.error(error);
    return <div>에러가 발생했습니다.</div>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    refetch();
  };
  console.log(data);
  return (
    <S.Layout>
      <S.FilterContainer>
        <S.Title>게시글 관리 </S.Title>
        <form onSubmit={handleSubmit}>
          <S.FormInner>
            <S.FilterBar>
              <label htmlFor="category-select" className="sr-only">
                카테고리 선택
              </label>
              <S.Select name="category" id="category-select" onChange={(e) => setFilter((prev) => ({ ...prev, category: e.target.value }))} value={filter.category}>
                {Object.entries(CATEGORY).map(([key, value]) => (
                  <option value={key} key={key}>
                    {value}
                  </option>
                ))}
              </S.Select>
              <div>
                <label htmlFor="search-select" className="sr-only">
                  검색 종류
                </label>
                <S.Select name="search-kind" id="search-select" onChange={(e) => setFilter((prev) => ({ ...prev, searchFilter: e.target.value }))} value={filter.searchFilter}>
                  {Object.entries(SEARCH_DATA).map(([key, value]) => (
                    <option value={key} key={key}>
                      {value}
                    </option>
                  ))}
                </S.Select>
                <S.Input type="text" placeholder="검색어를 입력하세요" onChange={(e) => setFilter((prev) => ({ ...prev, searchWord: e.target.value.trim() }))} value={filter.searchWord} />
              </div>
              <S.Button type="submit">검색</S.Button>
            </S.FilterBar>
            <S.DateContainer>
              <label htmlFor="start-date" className="sr-only">
                시작 날짜:
              </label>
              <S.Input type="date" id="start-date" name="start-date" value={filter.startDate} min={MIN_DATE} max={filter.endDate || MAX_DATE} onChange={(e) => setFilter((prev) => ({ ...prev, startDate: e.target.value }))} />
              <GoArrowRight />
              <label htmlFor="end-date" className="sr-only">
                종료 날짜:
              </label>
              <S.Input type="date" id="end-date" name="end-date" value={filter.endDate} min={filter.startDate || MIN_DATE} max={MAX_DATE} onChange={(e) => setFilter((prev) => ({ ...prev, endDate: e.target.value }))} />
            </S.DateContainer>
          </S.FormInner>
        </form>
      </S.FilterContainer>

      <S.TableContainer>
        <S.Table>
          <S.TableHead>
            <tr style={{ backgroundColor: '#f4f6f8' }}>
              <th scope="col">No.</th>
              <th scope="col">
                <S.SortButton onClick={() => setSort((prev) => ({ ...prev, date: prev.date === 'asc' ? 'desc' : 'asc' }))}>
                  날짜
                  {sort.date === 'asc' ? <LiaArrowUpSolid size={18} /> : <LiaArrowDownSolid size={18} />}
                </S.SortButton>
              </th>
              <th scope="col">카테고리</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">버튼</th>
            </tr>
          </S.TableHead>
          <S.TableBody>
            {data?.data?.map((item, index) => (
              <tr key={item.id}>
                <td>{data.totalCount - (data.currentPage - 1) * data.rowsPerPage - index}</td>
                <td>{item.created_at.slice(0, 10)}</td>
                <td>{item.category && CATEGORY[item.category as CategoryType]}</td>
                <td style={{ width: '25%', color: '#393939' }}>
                  <S.BoardLink to="">{item.title}</S.BoardLink>
                </td>

                <td>{item.profiles?.username}</td>
                <td>
                  <S.Button onClick={() => handleDeleteBoard(item.id)}>삭제</S.Button>
                </td>
              </tr>
            ))}
          </S.TableBody>
        </S.Table>
      </S.TableContainer>

      <S.Navigation>
        <div>{`${data.totalCount - (data.currentPage - 1) * data.rowsPerPage - data.count + 1} - ${data.totalCount - (data.currentPage - 1) * data.rowsPerPage} of ${data.totalCount}`}</div>
        <button onClick={() => setPage((prev) => --prev)} disabled={!data.hasPreviousPage}>
          이전페이지
        </button>
        <span>{page}</span>
        <button onClick={() => setPage((prev) => ++prev)} disabled={!data.hasNextPage}>
          다음페이지
        </button>
      </S.Navigation>
    </S.Layout>
  );
};

export default BoardManage;
