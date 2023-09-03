import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getAllReviewCount } from '../api/review';
import { getAllTutorCount, getTopReviewer } from '../api/tutor';
import { icon_class, icon_like, icon_tutor, main_banner } from '../assets';
import { Loading } from '../components';
import MatchingFlow from '../components/process/MatchingFlow';
import UserReviewList from '../components/review/mainReviewList/UserReviewList';
import TutorSlider from '../components/slider/tutorSlider/TutorSlider';
import { OverviewItem, OverviewItemIcon, OverviewItemNumber } from '../components/tutorInfoDetail/TutorInfoDetail.styled';
import { colors } from '../style/theme/colors';

const Main = () => {
  const tutorCount = useQuery(['tutorCount'], () => getAllTutorCount());
  const reviewCount = useQuery(['reviewCount'], () => getAllReviewCount());
  const { data: topReviewer, isLoading, isError } = useQuery(['topReviewer'], () => getTopReviewer());

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
      <Banner>
        <BannerContainer>
          <BannerContent>
            <BannerTitle>1:1 매칭 클래스</BannerTitle>
            <BannerText>나와 가까운 튜터를 쉽고 빠르게 만나보세요 </BannerText>
            <BannerBtn to={`/list`}>튜터 만나러 가기</BannerBtn>
          </BannerContent>
        </BannerContainer>
      </Banner>
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
              <OverviewItemIcon src={icon_like} alt="리뷰 아이콘" style={{ height: '37px' }} />
              <OverviewItemNumber>{reviewCount?.data}건</OverviewItemNumber>
              <span>리뷰 수</span>
            </OverviewItem>
            <OverviewItem>
              <OverviewItemIcon src={icon_class} alt="매칭 아이콘" style={{ height: '37px' }} />
              <OverviewItemNumber>{reviewCount?.data}</OverviewItemNumber>
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

const Banner = styled.div`
  background-image: url(${main_banner});
  background-repeat: no-repeat;
  background-size: contain;
`;

const BannerContainer = styled.div`
  height: 600px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;
const BannerContent = styled.div``;
const BannerTitle = styled.p`
  font-weight: bold;
  color: #fff;
`;
const BannerText = styled.p`
  font-size: 45px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 45px;
`;
const BannerBtn = styled(Link)`
  background-color: #fff;
  font-size: 22px;
  font-weight: bold;
  color: ${colors.primary}!important;
  padding: 8px 80px;
  margin-top: 45px;
  border-radius: 30px;
`;
