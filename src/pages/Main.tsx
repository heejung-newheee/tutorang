import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getAllReviewCount } from '../api/review';
import { getAllTutorCount, getTopReviewer, getTutors } from '../api/tutor';
import ProfileForm from '../components/Form/profileForm/CreateProfileForm';
import supabase from '../supabase';
import { TTutorWithUser } from '../supabase/database.types';
import TutorSlider from '../components/slider/tutorSlider/TutorSlider';
import UserReviewList from '../components/review/mainReviewList/UserReviewList';
import ProfilesCard from '../components/profilesCard/ProfilesCard';

const Main = () => {
  // const { isLoading, isError, data } = useQuery(['tutors'], () => getTutors());
  const tutorCount = useQuery(['tutorCount'], () => getAllTutorCount());
  const reviewCount = useQuery(['reviewCount'], () => getAllReviewCount());
  const { data: topReviewer, isLoading, isError } = useQuery(['topReviewer'], () => getTopReviewer());
  console.log(topReviewer);

  // 임시임.
  const [isFirstSocialUser, setIsFirstSocialUser] = useState(false);

  const checkFirstSocialSignin = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user === null) return false;
    const checkingFirstSocialUser = user?.user_metadata.role;
    if (user !== null && checkingFirstSocialUser === undefined) setIsFirstSocialUser(true);
  };

  useEffect(() => {
    checkFirstSocialSignin();
  }, []);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error</span>;
  }
  if (!topReviewer) {
    alert('ddd');
  }

  return (
    <div>
      Main
      {isFirstSocialUser && <ProfileForm />}
      <Section style={{ backgroundColor: '#4946cf' }}>
        <Banner>
          <BannerImage src="https://picsum.photos/1920/700?random=1" alt="" />
        </Banner>
      </Section>
      <Section style={{ backgroundColor: '#ffffff' }}>
        <Container>
          <SectionTitle>인기 강사</SectionTitle>
          {/* <TutorList>
            {data?.map((tutor) => (
              <li key={tutor.id}>
                <TutorCard tutor={tutor} />
              </li>
            ))}
          </TutorList> */}
          <TutorSlider tutorList={topReviewer} panels={4} uniqKey="main" />
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
      <UserReviewList />
    </div>
  );
};

export default Main;

export const Container = styled.div`
  max-width: 1200px;
  /* border: 1px solid red; */
  margin: 0 auto;
`;

export const Section = styled.section``;

export const SectionTitle = styled.h2`
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

const TutorCard = ({ tutor }: { tutor: TTutorWithUser }) => {
  return (
    <TutorCardContainer key={tutor.id}>
      <Link to={`/detail/${tutor.profiles.id}`}>
        <TutorCardImage src={tutor.profiles?.avatar_url ?? ''} alt={tutor.profiles?.username ?? 'profile image'} />
        <TutorCardContent>
          <TutorCardTitle>{tutor.profiles?.username}</TutorCardTitle>
          {/* <p>지역1: {tutor.location_1}</p>
        <p>지역2: {tutor.location_2}</p> */}
          <br />
          {tutor.class_info}
          <p>₩{tutor.tuition_fee_offline}~</p>
          <p>₩{tutor.tuition_fee_online}~</p>
        </TutorCardContent>
      </Link>
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
