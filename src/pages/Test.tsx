import { useNavigate } from 'react-router-dom';

const Test = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>튜터등록 test</h1>
      <button onClick={() => navigate('/tutor-registration')}>튜터등록버튼(누르면 튜터등록 form작성 페이지로 이동)</button>
    </div>
  );
};

export default Test;
