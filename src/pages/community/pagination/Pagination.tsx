import { Dispatch, SetStateAction } from 'react';
import { handleCurrentOne, handleNext, handlePrev, handleTotalNext } from '../utility';
import * as S from './Pagination.styled';

type Props = {
  setCurrentNum: Dispatch<SetStateAction<number>>;
  setHasPageMore: Dispatch<SetStateAction<boolean>>;
  currentNum: number;
  hasPageMore: boolean;
  totalPageNum: number | null;
  pageCount: number;
};

const Pagination = ({ setCurrentNum, setHasPageMore, currentNum, hasPageMore, totalPageNum, pageCount }: Props) => {
  return (
    <S.PaginationDiv>
      <S.LessGreaterThan onClick={() => handleCurrentOne(setCurrentNum, setHasPageMore)}>&laquo;</S.LessGreaterThan>
      <S.LessGreaterThan onClick={() => handlePrev(currentNum, setCurrentNum, setHasPageMore)}>&lsaquo;</S.LessGreaterThan>

      <S.PageNmberDiv>
        {currentNum !== 1 && <div>{currentNum - 1}</div>}
        <S.CurrentNumberDiv> {currentNum}</S.CurrentNumberDiv>
        {hasPageMore && totalPageNum !== 0 && totalPageNum && totalPageNum > pageCount && <div>{currentNum + 1}</div>}

        {hasPageMore && totalPageNum !== 0 && totalPageNum && totalPageNum > pageCount && <S.TotalPageNum> &hellip; {totalPageNum && Math.ceil(totalPageNum / pageCount)}</S.TotalPageNum>}
      </S.PageNmberDiv>

      <S.LessGreaterThan onClick={() => handleNext(currentNum, totalPageNum, setCurrentNum, setHasPageMore)}> &rsaquo;</S.LessGreaterThan>
      <S.LessGreaterThan onClick={() => handleTotalNext(totalPageNum, setCurrentNum, setHasPageMore)}> &raquo;</S.LessGreaterThan>
    </S.PaginationDiv>
  );
};

export default Pagination;
