import * as S from './Pagination.styled';
import NextFc from './fuctionCompo/NextFc';
import PrevFc from './fuctionCompo/PrevFc';
import TotalNext from './fuctionCompo/TotalNextFc';
import TotalPrevFc from './fuctionCompo/TotalPrevFc';
import { useSearchParams } from 'react-router-dom';

type Props = {
  totalPageNum: number | null;
  pageCount: number;
};

const Pagination = ({ totalPageNum, pageCount }: Props) => {
  const [query, _] = useSearchParams();
  const editPostNum = Number(query.get('q'));

  const isNextPageTrue = (closeness: number) => {
    const closenessStep = editPostNum + closeness;

    if (totalPageNum && totalPageNum !== 0) {
      const isTrue = totalPageNum > pageCount && totalPageNum > closenessStep * pageCount;
      return isTrue && true;
    }

    return null;
  };
  return (
    <S.PaginationDiv>
      <TotalPrevFc />
      <PrevFc />

      <S.PageNmberDiv>
        {editPostNum !== 1 && <div>{editPostNum - 1}</div>}
        <S.CurrentNumberDiv> {editPostNum}</S.CurrentNumberDiv>
        {isNextPageTrue(0) && <div>{editPostNum + 1}</div>}

        {isNextPageTrue(0) && <S.TotalPageNum> &hellip; {totalPageNum && Math.ceil(totalPageNum / pageCount)}</S.TotalPageNum>}
      </S.PageNmberDiv>

      <NextFc totalPageNum={totalPageNum} pageCount={pageCount} />
      <TotalNext totalPageNum={totalPageNum} pageCount={pageCount} />
    </S.PaginationDiv>
  );
};

export default Pagination;
