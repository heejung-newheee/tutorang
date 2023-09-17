import { useNavigate } from 'react-router-dom';
import * as S from '../Pagination.styled';

type Props = {
  currentQueryNum: number;
};

const PrevFc = ({ currentQueryNum }: Props) => {
  const navigate = useNavigate();

  const handlePrev = () => {
    if (currentQueryNum === 1) return;
    navigate(`.?q=${currentQueryNum - 1}`);
  };

  return (
    <>
      <S.LessGreaterThan onClick={() => handlePrev()}> &lsaquo;</S.LessGreaterThan>
    </>
  );
};

export default PrevFc;
