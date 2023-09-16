import styled from 'styled-components';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/modules';
import { colors } from '../../style/theme/colors';
import Banner from './banner/Banner';
import UserReviewList from './mainReviewList/UserReviewList';
import MatchingFlow from './matchingFlow/MatchingFlow';
import MainOverview from './overview/MainOverview';
import PopTutorList from './popTutor/PopTutorList';

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(closeModal());
    };
  }, []);

  return (
    <>
      <Banner />
      <PopTutorList />
      <MainOverview />
      <Empty />
      <MatchingFlow />
      <UserReviewList />
    </>
  );
};

export default Main;

export const Empty = styled.div`
  padding: 40px;
  @media screen and (max-width: 768px) {
    padding: 20px;
  }
`;
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
export const Section = styled.section`
  padding: 100px 10px;
  box-sizing: border-box;
  &.main {
    background-color: #f8f8f8;
  }

  &.user_review {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0px);
  }

  @media screen and (max-width: 768px) {
    padding: 50px 20px;
  }
`;
export const SectionTitle = styled.h2`
  display: inline-block;
  font-size: 28px;
  margin: 0 0 98px 0;
  padding: 0 0 0 10px;
  font-weight: 700;
  line-height: 1;
  border-left: 6px solid ${colors.primary};

  &.matched_review {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0px);
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
    margin: 0 0 50px 0;
  }
`;
