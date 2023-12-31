import * as S from './Pagination.styled';
import NextFc from './fuctionCompo/NextFc';
import PrevFc from './fuctionCompo/PrevFc';
import TotalNext from './fuctionCompo/TotalNextFc';
import TotalPrevFc from './fuctionCompo/TotalPrevFc';
import { Link, useSearchParams } from 'react-router-dom';

type Props = {
  totalPageNum: number | null;
  pageCount: number;
};

const Pagination = ({ totalPageNum, pageCount }: Props) => {
  const [query, _] = useSearchParams();
  const currentQueryNum = Number(query.get('q')) || 1;

  const isNextPageTrue = (closeness: number) => {
    const closenessStep = currentQueryNum + closeness;

    if (totalPageNum && totalPageNum !== 0) {
      const isTrue = totalPageNum > pageCount && totalPageNum > closenessStep * pageCount;
      return isTrue && true;
    }

    return null;
  };

  return (
    <S.PaginationDiv>
      <TotalPrevFc />
      <PrevFc currentQueryNum={currentQueryNum} />

      <S.PageNmberDiv>
        {currentQueryNum !== 1 && <Link to={`.?q=${currentQueryNum - 1}`}>{currentQueryNum - 1}</Link>}
        <S.CurrentNumberDiv> {currentQueryNum}</S.CurrentNumberDiv>
        {isNextPageTrue(0) && <Link to={`.?q=${currentQueryNum + 1}`}>{currentQueryNum + 1}</Link>}

        {isNextPageTrue(0) && <S.TotalPageNum> &hellip; {totalPageNum && Math.ceil(totalPageNum / pageCount)}</S.TotalPageNum>}
      </S.PageNmberDiv>

      <NextFc totalPageNum={totalPageNum} pageCount={pageCount} currentQueryNum={currentQueryNum} />
      <TotalNext totalPageNum={totalPageNum} pageCount={pageCount} />
    </S.PaginationDiv>
  );
};

export default Pagination;
