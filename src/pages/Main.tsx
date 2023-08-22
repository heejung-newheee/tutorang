import { useQuery } from '@tanstack/react-query';
import { getAllTutorCount, getTutors } from '../api/tutor';
import styled from 'styled-components';
import { TTutorWithUser } from '../supabase/database.types';
import { getAllReviewCount } from '../api/review';

const Main = () => {
  const { isLoading, isError, data } = useQuery(['tutors'], () => getTutors());
  const tutorCount = useQuery(['tutorCount'], () => getAllTutorCount());
  const reviewCount = useQuery(['reviewCount'], () => getAllReviewCount());

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  return (
    <div>
      Main
      <Section style={{ backgroundColor: '#4946cf' }}>
        <Banner>
          <BannerImage src="https://picsum.photos/1920/700?random=1" alt="" />
        </Banner>
      </Section>
      <Section style={{ backgroundColor: '#ffffff' }}>
        <Container>
          <SectionTitle>인기 강사</SectionTitle>
          <TutorList>
            {data?.map((tutor) => (
              <li key={tutor.id}>
                <TutorCard tutor={tutor} />
              </li>
            ))}
          </TutorList>
        </Container>
      </Section>
      <Section style={{ backgroundColor: '#d8d2d2' }}>
        <Container>
          <DataSummary>
            <SummaryItem>
              <p>튜터 수: {tutorCount?.data}</p>
            </SummaryItem>
            <SummaryItem>
              <p>후기 수: {reviewCount?.data}</p>
            </SummaryItem>
            <SummaryItem>
              <p>매칭 수</p>
            </SummaryItem>
          </DataSummary>
        </Container>
      </Section>
      <Section>
        <Container>
          <MatchFlow></MatchFlow>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionTitle style={{ textAlign: 'center' }}>이용 후기</SectionTitle>
          <ReviewList>
            <ReviewItem>
              <ReviewItemContent>
                <ReviewItemTitle>지금까지 배웠던 영어랑 너무 달라서 충격이었어요</ReviewItemTitle>
                <ReviewItemText>튜러랑 매칭 후 이용후기 튜러랑 매칭 후 이용후기 튜러랑 매칭 후 튜러랑 매칭 후 이용후기 튜러랑 매칭 후 </ReviewItemText>
                <ReviewItemAuthor>박금별(25)</ReviewItemAuthor>
              </ReviewItemContent>
              <ReviewItemImage src="https://picsum.photos/550/370?random=1"></ReviewItemImage>
            </ReviewItem>
            <ReviewItem style={{ flexDirection: 'row-reverse' }}>
              <ReviewItemContent>
                <ReviewItemTitle>지금까지 배웠던 영어랑 너무 달라서 충격이었어요</ReviewItemTitle>
                <ReviewItemText>튜러랑 매칭 후 이용후기 튜러랑 매칭 후 이용후기 튜러랑 매칭 후 튜러랑 매칭 후 이용후기 튜러랑 매칭 후 </ReviewItemText>
                <ReviewItemAuthor>박금별(25)</ReviewItemAuthor>
              </ReviewItemContent>
              <ReviewItemImage src="https://picsum.photos/550/370?random=1"></ReviewItemImage>
            </ReviewItem>
            <ReviewItem>
              <ReviewItemContent>
                <ReviewItemTitle>지금까지 배웠던 영어랑 너무 달라서 충격이었어요</ReviewItemTitle>
                <ReviewItemText>튜러랑 매칭 후 이용후기 튜러랑 매칭 후 이용후기 튜러랑 매칭 후 튜러랑 매칭 후 이용후기 튜러랑 매칭 후 </ReviewItemText>
                <ReviewItemAuthor>박금별(25)</ReviewItemAuthor>
              </ReviewItemContent>
              <ReviewItemImage src="https://picsum.photos/550/370?random=1"></ReviewItemImage>
            </ReviewItem>
          </ReviewList>
        </Container>
      </Section>
    </div>
  );
};

export default Main;

const Container = styled.div`
  max-width: 1200px;
  border: 1px solid red;
  margin: 0 auto;
`;

const Section = styled.section``;

const SectionTitle = styled.h2`
  font-weight: 700;
  font-size: 1.5rem;
  margin: 2rem 0;
`;

const Banner = styled.div``;

const BannerImage = styled.img`
  height: 700px;
  width: 100%;
  object-fit: cover;
`;

const TutorList = styled.ul`
  display: flex;
  justify-content: space-evenly;
  padding: 3rem 0;
`;

const DataSummary = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 2rem 0;
`;

const SummaryItem = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #0f365a;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MatchFlow = styled.div`
  height: 1000px;
  background-color: #73a9ff;
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const ReviewItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ReviewItemContent = styled.div`
  max-width: 550px;
`;

const ReviewItemTitle = styled.h4`
  font-size: 2.5rem;
  font-weight: 700;
`;

const ReviewItemText = styled.p`
  font-size: 1.25rem;
`;

const ReviewItemAuthor = styled.span`
  font-size: 1.375rem;
`;

const ReviewItemImage = styled.img`
  height: 100%;
`;

const TutorCard = ({ tutor }: { tutor: TTutorWithUser }) => {
  return (
    <TutorCardContainer key={tutor.id}>
      <TutorCardImage src={tutor.profiles?.avatar_url ?? ''} alt={tutor.profiles?.username ?? 'profile image'} />
      <TutorCardContent>
        <TutorCardTitle>{tutor.profiles?.username}</TutorCardTitle>
        {/* <p>지역1: {tutor.location_1}</p>
        <p>지역2: {tutor.location_2}</p> */}
        <br />
        {tutor.class_info}
        <p>₩{tutor.price}~</p>
      </TutorCardContent>
    </TutorCardContainer>
  );
};

const TutorCardContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 250px;
`;

const TutorCardTitle = styled.h4`
  font-weight: 700;
  font-size: 1.25rem;
`;

const TutorCardImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
`;

const TutorCardContent = styled.div`
  padding: 1rem;
`;
