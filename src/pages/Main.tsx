import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getAllReviewCount } from '../api/review';
import { getAllTutorCount, getTopReviewer } from '../api/tutor';
import ProfileForm from '../components/Form/profileForm/CreateProfileForm';
import supabase from '../supabase';
import { TTutorWithUser } from '../supabase/database.types';
import TutorSlider from '../components/slider/tutorSlider/TutorSlider';
import UserReviewList from '../components/review/mainReviewList/UserReviewList';
import { OverviewContainer, OverviewItem, OverviewItemIcon, OverviewItemNumber, OverviewList } from '../components/tutorInfoDetail/TutorInfoDetail.styled';
import { icon_class, icon_like, icon_tutor } from '../assets';

const Main = () => {
  // const { isLoading, isError, data } = useQuery(['tutors'], () => getTutors());
  const tutorCount = useQuery(['tutorCount'], () => getAllTutorCount());
  const reviewCount = useQuery(['reviewCount'], () => getAllReviewCount());
  const { data: topReviewer, isLoading, isError } = useQuery(['topReviewer'], () => getTopReviewer());
  console.log(topReviewer);

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
    <>
      <Banner>
        <BannerImage src="https://picsum.photos/1920/700?random=1" alt="" />
      </Banner>
      <Section style={{ backgroundColor: '#ffffff' }}>
        <Container>
          <SectionTitle>BEST 튜터</SectionTitle>
          <SectionSubTitle>인기있는 튜터를 만나보세요</SectionSubTitle>
          {/* <TutorList>
            {data?.map((tutor) => (
              <li key={tutor.id}>
                <TutorCard tutor={tutor} />
              </li>
            ))}
          </TutorList> */}
          <TutorSlider tutorList={topReviewer} panels={4} uniqueKey="main" />
        </Container>
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
          {/* <DataSummary>
            <SummaryItem>
              <p>튜터 수: {tutorCount?.data}</p>
            </SummaryItem>
            <SummaryItem>
              <p>후기 수: {reviewCount?.data}</p>
            </SummaryItem>
            <SummaryItem>
              <p>매칭 수</p>
            </SummaryItem>
          </DataSummary> */}
        </Container>
      </Section>
      <div style={{ padding: '53px' }}></div>
      <Section style={{ backgroundColor: '#f8f8f8' }}>
        <Container>
          <MatchFlow></MatchFlow>
        </Container>
      </Section>

      <UserReviewList />
    </>
  );
};

export default Main;

export const Container = styled.div`
  max-width: 1200px;
  /* border: 1px solid red; */
  margin: 0 auto;
`;

export const Section = styled.section`
  padding: 100px 0;
`;

export const SectionTitle = styled.h2`
  font-weight: 700;
  font-size: 20px;
  margin: 0 0 6px 0;
  color: #3f3e3e;
`;
export const SectionSubTitle = styled.h3`
  font-size: 32px;
  margin: 0 0 58px 0;
  font-weight: bold;
`;
const Banner = styled.div``;

const BannerImage = styled.img`
  height: 700px;
  width: 100%;
  object-fit: cover;
`;

// const TutorList = styled.ul`
//   display: flex;
//   justify-content: space-evenly;
//   padding: 3rem 0;
// `;

// const DataSummary = styled.div`
//   display: flex;
//   justify-content: space-evenly;
//   padding: 2rem 0;
// `;

// const SummaryItem = styled.div`
//   width: 100px;
//   height: 100px;
//   border-radius: 50%;
//   background-color: #0f365a;
//   color: #fff;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const MatchFlow = styled.div`
  height: 1000px;
  background-color: #b0cefd;
`;

// // const TutorCard = ({ tutor }: { tutor: TTutorWithUser }) => {
// //   return (
// //     <TutorCardContainer key={tutor.id}>
// //       <Link to={`/detail/${tutor.profiles.id}`}>
// //         <TutorCardImage src={tutor.profiles?.avatar_url ?? ''} alt={tutor.profiles?.username ?? 'profile image'} />
// //         <TutorCardContent>
// //           <TutorCardTitle>{tutor.profiles?.username}</TutorCardTitle>
// //           {/* <p>지역1: {tutor.location_1}</p>
// //         <p>지역2: {tutor.location_2}</p> */}
// //           <br />
// //           {tutor.class_info}
// //           <p>₩{tutor.tuition_fee_offline}~</p>
// //           <p>₩{tutor.tuition_fee_online}~</p>
// //         </TutorCardContent>
// //       </Link>
// //     </TutorCardContainer>
// //   );
// // };

// const TutorCardContainer = styled.div`
//   box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
//   background-color: #ffffff;
//   border-radius: 10px;
//   display: flex;
//   flex-direction: column;
//   width: 250px;
// `;

// const TutorCardTitle = styled.h4`
//   font-weight: 700;
//   font-size: 1.25rem;
// `;

// const TutorCardImage = styled.img`
//   width: 100%;
//   aspect-ratio: 1;
//   object-fit: cover;
// `;

// const TutorCardContent = styled.div`
//   padding: 1rem;
// `;
