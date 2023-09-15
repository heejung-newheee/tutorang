import { useDispatch, useSelector } from 'react-redux';
import * as S from '../Pagination.styled';
import { setPageNum } from '../../../../redux/modules/pageNumSlice';
import { useNavigate } from 'react-router-dom';

type Props = {
  totalPageNum: number | null;
  pageCount: number;
  currentQueryNum: number;
};

const NextFc = ({ totalPageNum, pageCount, currentQueryNum }: Props) => {
  const dispatch = useDispatch();
  const { currentPageNum } = useSelector((state: any) => state.PageNum);
  const navigate = useNavigate();

  const handleNext = () => {
    const totalPostNum = currentQueryNum * pageCount;

    if (totalPageNum && totalPageNum < totalPostNum) return;
    if (totalPageNum && totalPageNum > totalPostNum) {
      dispatch(setPageNum(currentPageNum + 1));
      navigate(`./?q=${currentQueryNum + 1}`);
    }

    const nextCurrentNum = currentQueryNum + 1;
    if (totalPageNum && totalPageNum <= nextCurrentNum * pageCount) {
    }
  };

  return (
    <>
      <S.LessGreaterThan onClick={() => handleNext()}> &rsaquo;</S.LessGreaterThan>
    </>
  );
};

export default NextFc;
