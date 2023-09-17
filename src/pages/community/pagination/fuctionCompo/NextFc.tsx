import { useNavigate } from 'react-router-dom';
import * as S from '../Pagination.styled';

type Props = {
  totalPageNum: number | null;
  pageCount: number;
  currentQueryNum: number;
};

const NextFc = ({ totalPageNum, pageCount, currentQueryNum }: Props) => {
  const navigate = useNavigate();

  const handleNext = () => {
    const totalPostNum = currentQueryNum * pageCount;

    if (totalPageNum && totalPageNum < totalPostNum) return;
    if (totalPageNum && totalPageNum > totalPostNum) {
      navigate(`.?q=${currentQueryNum + 1}`);
    }
  };

  return (
    <>
      <S.LessGreaterThan onClick={() => handleNext()}> &rsaquo;</S.LessGreaterThan>
    </>
  );
};

export default NextFc;
