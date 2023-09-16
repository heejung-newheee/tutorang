import { useDispatch, useSelector } from 'react-redux';
import * as S from '../Pagination.styled';
import { setPageNum } from '../../../../redux/modules/pageNumSlice';
import { useNavigate } from 'react-router-dom';

type Props = {
  currentQueryNum: number;
};

const PrevFc = ({ currentQueryNum }: Props) => {
  const dispatch = useDispatch();
  const { currentPageNum } = useSelector((state: any) => state.PageNum);
  const navigate = useNavigate();

  const handlePrev = () => {
    if (currentQueryNum === 1) return;
    dispatch(setPageNum(currentPageNum - 1));
    navigate(`.?q=${currentQueryNum - 1}`);
  };

  return (
    <>
      <S.LessGreaterThan onClick={() => handlePrev()}> &lsaquo;</S.LessGreaterThan>
    </>
  );
};

export default PrevFc;
