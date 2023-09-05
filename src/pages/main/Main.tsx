import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getAllMatchCount } from '../../api/match';
import { getAllReviewCount } from '../../api/review';
import { getAllTutorCount, getTopReviewer } from '../../api/tutor';
import { icon_class, icon_like, icon_tutor } from '../../assets';
import { Loading } from '../../components';
import TutorSlider from '../../components/slider/tutorSlider/TutorSlider';
import { MATCHED_COUNT_QUERY_KEY, REVIEW_ALL_QUERY_KEY, TUTOR_ALL_QUERY_KEY, TUTOR_TOP_REVIEW_QUERY_KEY } from '../../constants/query.constant';

import { colors } from '../../style/theme/colors';
import { OverviewItem, OverviewItemIcon, OverviewItemIcon2, OverviewItemNumber } from '../detail/tutorInfoDetail/TutorInfoDetail.styled';
import Banner from './banner/Banner';
import UserReviewList from './mainReviewList/UserReviewList';
import MatchingFlow from './matchingFlow/MatchingFlow';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { closeModal } from '../../redux/modules';

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(closeModal());
    };
  }, []);

  const tutorCount = useQuery(TUTOR_ALL_QUERY_KEY, () => getAllTutorCount());
  const reviewCount = useQuery(REVIEW_ALL_QUERY_KEY, () => getAllReviewCount());
  const matchCount = useQuery(MATCHED_COUNT_QUERY_KEY, () => getAllMatchCount());
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
        <TutorSlider tutorList={topReviewer} panels={5} uniqueKey="main" />
      </Section>
      <Section style={{ backgroundColor: '#f8f8f8' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', maxWidth: '900px', margin: '0 auto' }}>
            <OverviewItem>
              <OverviewItemIcon src={icon_tutor} alt="튜터 아이콘" style={{ height: '37px' }} />
              <OverviewItemNumber>{tutorCount?.data}건</OverviewItemNumber>
              <span>튜터 수</span>
            </OverviewItem>
            <OverviewItem>
              <OverviewItemIcon src={icon_class} alt="리뷰 아이콘" style={{ height: '37px' }} />
              <OverviewItemNumber>{reviewCount?.data}건</OverviewItemNumber>
              <span>리뷰 수</span>
            </OverviewItem>
            <OverviewItem>
              <OverviewItemIcon2 src={icon_like} alt="매칭 아이콘" style={{ height: '37px' }} />
              <OverviewItemNumber>{matchCount?.data}건</OverviewItemNumber>
              <span>매칭 횟수</span>
            </OverviewItem>
          </div>
        </Container>
      </Section>
      <div style={{ padding: '53px' }}></div>
      <MatchingFlow />
      <UserReviewList />
    </>
  );
};

export default Main;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
export const Section = styled.section`
  padding: 100px 0;
  @media screen and (max-width: 768px) {
    padding: 50px 0;
  }
`;

export const SectionTitle = styled.h2`
  display: inline-block;
  font-size: 28px;
  margin: 0 0 58px 0;
  padding: 0 0 0 10px;
  font-weight: bold;
  line-height: 1;
  border-left: 6px solid ${colors.primary};
`;
export const SectionSubTitle = styled.h3``;
