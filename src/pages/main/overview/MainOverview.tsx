import { useQuery } from '@tanstack/react-query';
import { getAllMatchCount } from '../../../api/match';
import { getAllReviewCount } from '../../../api/review';
import { getAllTutorCount } from '../../../api/tutor';
import { icon_class, icon_like, icon_tutor } from '../../../assets';
import { MATCHED_COUNT_QUERY_KEY, REVIEW_ALL_QUERY_KEY, TUTOR_ALL_QUERY_KEY } from '../../../constants/query.constant';
import { OverviewItem, OverviewItemIcon, OverviewItemNumber } from '../../detail/tutorInfoDetail/TutorInfoDetail.styled';
import { Container, Section } from '../Main';

const MainOverview = () => {
  const tutorCount = useQuery(TUTOR_ALL_QUERY_KEY, () => getAllTutorCount());
  const reviewCount = useQuery(REVIEW_ALL_QUERY_KEY, () => getAllReviewCount());
  const matchCount = useQuery(MATCHED_COUNT_QUERY_KEY, () => getAllMatchCount());
  return (
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
            <OverviewItemIcon src={icon_like} alt="매칭 아이콘" style={{ height: '37px' }} />
            <OverviewItemNumber>{matchCount?.data}건</OverviewItemNumber>
            <span>매칭 횟수</span>
          </OverviewItem>
        </div>
      </Container>
    </Section>
  );
};

export default MainOverview;
