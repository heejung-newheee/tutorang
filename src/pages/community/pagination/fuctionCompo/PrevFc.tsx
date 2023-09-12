import { useDispatch, useSelector } from 'react-redux';
import * as S from '../Pagination.styled';
import { setPageNum } from '../../../../redux/modules/pageNumSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PrevFc = () => {
  const dispatch = useDispatch();
  const { currentPageNum } = useSelector((state: any) => state.PageNum);
  const navigate = useNavigate();

  const [query, _] = useSearchParams();
  const editPostNum = Number(query.get('q'));

  const handlePrev = () => {
    if (editPostNum === 1) return;
    dispatch(setPageNum(currentPageNum - 1));
    navigate(`./?q=${editPostNum - 1}`);
  };

  return (
    <>
      <S.LessGreaterThan onClick={() => handlePrev()}> &lsaquo;</S.LessGreaterThan>
    </>
  );
};

export default PrevFc;
