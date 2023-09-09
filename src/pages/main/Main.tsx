import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getTopReviewer } from '../../api/tutor';
import { Loading } from '../../components';
import { TUTOR_TOP_REVIEW_QUERY_KEY } from '../../constants/query.constant';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PopTutorSlider from '../../components/slider/mainPopTutor/PopTutorSlider';
import { closeModal } from '../../redux/modules';
import { colors } from '../../style/theme/colors';
import Banner from './banner/Banner';
import UserReviewList from './mainReviewList/UserReviewList';
import MatchingFlow from './matchingFlow/MatchingFlow';
import MainOverview from './overview/MainOverview';

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(closeModal());
    };
  }, []);

  const { data: topReviewer, isLoading, isError } = useQuery(TUTOR_TOP_REVIEW_QUERY_KEY, () => getTopReviewer());

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <span>Error</span>;
  }
  if (!topReviewer) {
    alert('인기순위 튜터 리스트가 없습니다.');
  }

  return (
    <>
      <Banner />
      <Section style={{ backgroundColor: '#ffffff' }}>
        <Container>
          <SectionTitle>인기있는 튜터를 만나보세요</SectionTitle>
        </Container>
        <PopTutorSlider tutorList={topReviewer} panels={5} uniqueKey="main" />
      </Section>
      <MainOverview />
      <Empty />
      <MatchingFlow />
      <UserReviewList />
    </>
  );
};

export default Main;

export const Empty = styled.div`
  padding: 53px;
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
  @media screen and (max-width: 768px) {
    padding: 50px 20px;
  }
`;

export const SectionTitle = styled.h2`
  display: inline-block;
  font-size: 28px;
  margin: 0 0 98px 0;
  padding: 0 0 0 10px;
  font-weight: bold;
  line-height: 1;
  border-left: 6px solid ${colors.primary};
  @media screen and (max-width: 768px) {
    font-size: 18px;
    margin: 0 0 50px 0;
  }
`;
export const SectionSubTitle = styled.h3``;
