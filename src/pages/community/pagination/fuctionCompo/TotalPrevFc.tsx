import * as S from '../Pagination.styled';
import { useNavigate } from 'react-router-dom';

const TotalPrevFc = () => {
  const navigate = useNavigate();

  const handleCurrentOne = () => {
    navigate(`.?q=${1}`);
  };

  return (
    <>
      <S.LessGreaterThan onClick={() => handleCurrentOne()}> &laquo;</S.LessGreaterThan>
    </>
  );
};

export default TotalPrevFc;
