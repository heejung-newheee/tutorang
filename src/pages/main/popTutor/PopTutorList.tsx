import { useQuery } from '@tanstack/react-query';
import { getTopReviewer } from '../../../api/tutor';
import { Loading } from '../../../components';
import PopTutorSlider from '../../../components/slider/mainPopTutor/PopTutorSlider';
import { TUTOR_TOP_REVIEW_QUERY_KEY } from '../../../constants/query.constant';
import { Container, Section, SectionTitle } from '../Main';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/config/configStore';
import { displayToastAsync } from '../../../redux/modules';

const PopTutorList = () => {
  const { data: topReviewer, isLoading, isError } = useQuery(TUTOR_TOP_REVIEW_QUERY_KEY, () => getTopReviewer());

  const dispatch = useDispatch<AppDispatch>();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <span>Error</span>;
  }
  if (!topReviewer) {
    dispatch(displayToastAsync({ id: Date.now(), type: 'warning', message: '인기순위 튜터 리스트가 없습니다.' }));
  }
  return (
    <Section style={{ backgroundColor: '#ffffff' }}>
      <Container>
        <SectionTitle>인기있는 튜터를 만나보세요</SectionTitle>
      </Container>
      <PopTutorSlider tutorList={topReviewer} panels={6} uniqueKey="main" />
    </Section>
  );
};

export default PopTutorList;
