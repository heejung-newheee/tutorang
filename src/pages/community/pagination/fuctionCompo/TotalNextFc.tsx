import * as S from '../Pagination.styled';
import { useNavigate } from 'react-router-dom';

type Props = {
  totalPageNum: number | null;
  pageCount: number;
};

const TotalNextFc = ({ totalPageNum, pageCount }: Props) => {
  const navigate = useNavigate();

  const handleTotalNext = () => {
    if (totalPageNum && totalPageNum <= pageCount) return;
    const totalCurrent = totalPageNum && Math.ceil(totalPageNum / pageCount);
    navigate(`./?q=${totalCurrent}`);
  };

  return (
    <>
      <S.LessGreaterThan onClick={() => handleTotalNext()}> &raquo;</S.LessGreaterThan>
    </>
  );
};

export default TotalNextFc;
