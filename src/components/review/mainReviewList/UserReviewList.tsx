import { useDispatch } from 'react-redux';
import { Container, Section, SectionSubTitle, SectionTitle } from '../../../pages/Main';
import * as S from './UserReviewList.styled';
import { openModal } from '../../../redux/modules';
import { play_button } from '../../../assets';

const UserReviewList = () => {
  const dispatch = useDispatch();
  const handleYoutubePlayer = (id: string): void => {
    dispatch(openModal({ type: 'reviewYoutube', targetId: id }));
  };
  return (
    <Section>
      <Container>
        <SectionTitle style={{ textAlign: 'center' }}>생생한 후기를 들어보세요</SectionTitle>
        {/* <SectionSubTitle style={{ textAlign: 'center' }}>가벼운 마음으로 시작했다가, 지금은 Ing~</SectionSubTitle> */}
        <S.ReviewList>
          <S.ReviewItem>
            <S.ReviewItemContent>
              <S.ReviewItemTitle>지금까지 배웠던 영어랑 너무 달라서 충격이었어요</S.ReviewItemTitle>
              <S.ReviewItemText>튜러랑 매칭 후 이용후기 튜러랑 매칭 후 이용후기 튜러랑 매칭 후 튜러랑 매칭 후 이용후기 튜러랑 매칭 후 </S.ReviewItemText>
              <S.ReviewItemAuthor>박금별(25)</S.ReviewItemAuthor>
            </S.ReviewItemContent>
            <S.ReviewVideoBox onClick={() => handleYoutubePlayer('NUtFwYGyeTY')}>
              <S.ReviewItemImage src="https://i1.ytimg.com/vi/NUtFwYGyeTY/sddefault.jpg" />
              <S.PlayBtn src={play_button} alt="play button" />
            </S.ReviewVideoBox>
          </S.ReviewItem>
          <S.ReviewItem style={{ flexDirection: 'row-reverse' }}>
            <S.ReviewItemContent>
              <S.ReviewItemTitle>지금까지 배웠던 영어랑 너무 달라서 충격이었어요</S.ReviewItemTitle>
              <S.ReviewItemText>튜러랑 매칭 후 이용후기 튜러랑 매칭 후 이용후기 튜러랑 매칭 후 튜러랑 매칭 후 이용후기 튜러랑 매칭 후 </S.ReviewItemText>
              <S.ReviewItemAuthor>박금별(25)</S.ReviewItemAuthor>
            </S.ReviewItemContent>
            <S.ReviewVideoBox onClick={() => handleYoutubePlayer('uFWskJdruQ8')}>
              <S.ReviewItemImage src="https://i1.ytimg.com/vi/uFWskJdruQ8/sddefault.jpg" />
              <S.PlayBtn src={play_button} alt="play button" />
            </S.ReviewVideoBox>
          </S.ReviewItem>
          <S.ReviewItem>
            <S.ReviewItemContent>
              <S.ReviewItemTitle>지금까지 배웠던 영어랑 너무 달라서 충격이었어요</S.ReviewItemTitle>
              <S.ReviewItemText>튜러랑 매칭 후 이용후기 튜러랑 매칭 후 이용후기 튜러랑 매칭 후 튜러랑 매칭 후 이용후기 튜러랑 매칭 후 </S.ReviewItemText>
              <S.ReviewItemAuthor>박금별(25)</S.ReviewItemAuthor>
            </S.ReviewItemContent>
            <S.ReviewVideoBox onClick={() => handleYoutubePlayer('jXOWzFr-a_Q')}>
              <S.ReviewItemImage src="https://i1.ytimg.com/vi/jXOWzFr-a_Q/sddefault.jpg" />
              <S.PlayBtn src={play_button} alt="play button" />
            </S.ReviewVideoBox>
          </S.ReviewItem>
        </S.ReviewList>
      </Container>
    </Section>
  );
};

export default UserReviewList;
