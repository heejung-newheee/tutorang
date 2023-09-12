import { useDispatch, useSelector } from 'react-redux';
import * as S from '../Pagination.styled';
import { setPageNum } from '../../../../redux/modules/pageNumSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';

type Props = {
  totalPageNum: number | null;
  pageCount: number;
};

const NextFc = ({ totalPageNum, pageCount }: Props) => {
  const dispatch = useDispatch();
  const { currentPageNum } = useSelector((state: any) => state.PageNum);
  const navigate = useNavigate();

  const [query, _] = useSearchParams();
  const editPostNum = Number(query.get('q'));

  const handleNext = () => {
    const totalPostNum = editPostNum * pageCount;

    if (totalPageNum && totalPageNum < totalPostNum) return;
    if (totalPageNum && totalPageNum > totalPostNum) {
      dispatch(setPageNum(currentPageNum + 1));
      navigate(`./?q=${editPostNum + 1}`);
    }

    const nextCurrentNum = editPostNum + 1;
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
