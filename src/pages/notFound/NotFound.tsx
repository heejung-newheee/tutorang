import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import animationData from '../../assets/lottie/animation_lm1km4tq.json';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/modules';
import { useEffect } from 'react';

const NotFound = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(closeModal());
    };
  }, []);

  return (
    <Container>
      <div>
        <Lottie animationData={animationData} loop height={400} width={400} />
        <HomeLink to="/" replace>
          홈페이지로 돌아가기
        </HomeLink>
      </div>
    </Container>
  );
};

export default NotFound;

const Container = styled.div`
  position: relative;
`;

const HomeLink = styled(Link)`
  border: 2px solid #262626;
  background-color: #ffffff;
  border-radius: 10px;
  color: #262626;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  position: absolute;
  bottom: 13%;
  left: 50%;
  transform-origin: 50% 50%;
  animation: zoom 1s infinite alternate;
  &:hover,
  &:focus,
  &:focus-within {
    background-color: #d5d5d5;
  }
  @keyframes zoom {
    from {
      transform: translateX(-50%) scale(1);
    }

    to {
      transform: translateX(-50%) scale(1.2);
    }
  }
`;
