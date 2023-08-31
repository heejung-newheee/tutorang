import { useDispatch } from 'react-redux';
import { Container, Section, SectionTitle } from '../../../pages/Main';
import * as S from './UserReviewList.styled';
import { openModal } from '../../../redux/modules';

const UserReviewList = () => {
  const dispatch = useDispatch();
  const handleYoutubePlayer = (id: string): void => {
    dispatch(openModal({ type: 'reviewYoutube', targetId: id }));
  };
  return (
    <Section>
      <Container>
        <SectionTitle style={{ textAlign: 'center' }}>이용 후기</SectionTitle>
        <S.ReviewList>
          <S.ReviewItem>
            <S.ReviewItemContent>
              <S.ReviewItemTitle>지금까지 배웠던 영어랑 너무 달라서 충격이었어요</S.ReviewItemTitle>
              <S.ReviewItemText>튜러랑 매칭 후 이용후기 튜러랑 매칭 후 이용후기 튜러랑 매칭 후 튜러랑 매칭 후 이용후기 튜러랑 매칭 후 </S.ReviewItemText>
              <S.ReviewItemAuthor>박금별(25)</S.ReviewItemAuthor>
            </S.ReviewItemContent>
            <S.ReviewVideoBox>
              <S.ReviewItemImage onClick={() => handleYoutubePlayer('NUtFwYGyeTY')} src="https://i1.ytimg.com/vi/NUtFwYGyeTY/sddefault.jpg"></S.ReviewItemImage>
            </S.ReviewVideoBox>
          </S.ReviewItem>
          <S.ReviewItem style={{ flexDirection: 'row-reverse' }}>
            <S.ReviewItemContent>
              <S.ReviewItemTitle>지금까지 배웠던 영어랑 너무 달라서 충격이었어요</S.ReviewItemTitle>
              <S.ReviewItemText>튜러랑 매칭 후 이용후기 튜러랑 매칭 후 이용후기 튜러랑 매칭 후 튜러랑 매칭 후 이용후기 튜러랑 매칭 후 </S.ReviewItemText>
              <S.ReviewItemAuthor>박금별(25)</S.ReviewItemAuthor>
            </S.ReviewItemContent>
            <S.ReviewVideoBox>
              <S.ReviewItemImage onClick={() => handleYoutubePlayer('uFWskJdruQ8')} src="https://i1.ytimg.com/vi/uFWskJdruQ8/sddefault.jpg"></S.ReviewItemImage>
            </S.ReviewVideoBox>
          </S.ReviewItem>
          <S.ReviewItem>
            <S.ReviewItemContent>
              <S.ReviewItemTitle>지금까지 배웠던 영어랑 너무 달라서 충격이었어요</S.ReviewItemTitle>
              <S.ReviewItemText>튜러랑 매칭 후 이용후기 튜러랑 매칭 후 이용후기 튜러랑 매칭 후 튜러랑 매칭 후 이용후기 튜러랑 매칭 후 </S.ReviewItemText>
              <S.ReviewItemAuthor>박금별(25)</S.ReviewItemAuthor>
            </S.ReviewItemContent>
            <S.ReviewVideoBox>
              <S.ReviewItemImage onClick={() => handleYoutubePlayer('jXOWzFr-a_Q')} src="https://i1.ytimg.com/vi/jXOWzFr-a_Q/sddefault.jpg"></S.ReviewItemImage>
            </S.ReviewVideoBox>
          </S.ReviewItem>
        </S.ReviewList>
      </Container>
    </Section>
  );
};

export default UserReviewList;
