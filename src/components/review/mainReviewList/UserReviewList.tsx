import { useDispatch } from 'react-redux';
import { play_button } from '../../../assets';
import { Container, Section, SectionTitle } from '../../../pages/Main';
import { openModal } from '../../../redux/modules';
import * as S from './UserReviewList.styled';

const UserReviewList = () => {
  const dispatch = useDispatch();
  const handleYoutubePlayer = (id: string): void => {
    dispatch(openModal({ type: 'reviewYoutube', targetId: id }));
  };
  return (
    <Section>
      <Container>
        <SectionTitle style={{ position: 'relative', left: '50%', transform: 'translate(-50%, 0px)' }}>생생한 후기를 들어보세요</SectionTitle>
        {/* <SectionSubTitle style={{ textAlign: 'center' }}>가벼운 마음으로 시작했다가, 지금은 Ing~</SectionSubTitle> */}
        <S.ReviewList>
          <S.ReviewItem>
            <S.ReviewItemContent>
              <S.ReviewItemTitle>캐나다 유학와서 외국 친구 잔뜩 사귀었어요!</S.ReviewItemTitle>
              <S.ReviewItemText>캐나다 대학에 교환학생 경험이 있는 튜터님이 계셔서 꿀팁 잔뜩 얻으며 재밌게 수업했어요! 유학 직전 3개월간 꾸준히 이 사이트를 이용했고, 결국 캐나다에서 외국 친구들과 자유롭게 대화할 수 있게 됐어요!!!</S.ReviewItemText>
              <S.ReviewItemAuthor>나열심(22)</S.ReviewItemAuthor>
            </S.ReviewItemContent>
            <S.ReviewVideoBox onClick={() => handleYoutubePlayer('NUtFwYGyeTY')}>
              <S.ReviewItemImage src="https://i1.ytimg.com/vi/NUtFwYGyeTY/sddefault.jpg" />
              <S.PlayBtn src={play_button} alt="play button" />
            </S.ReviewVideoBox>
          </S.ReviewItem>
          <S.ReviewItem style={{ flexDirection: 'row-reverse' }}>
            <S.ReviewItemContent>
              <S.ReviewItemTitle>육아맘에게 맞는 튜터님도 계시네요!</S.ReviewItemTitle>
              <S.ReviewItemText>육아중이라 아이와 관련된 생각밖에 없는데 1:1 매칭 서비스로 같은 상황에 있고, 성격도 잘맞는 튜터님을 만나게 되었어요! 관심 많은 내용에 대해서 영어로 대화할 수 있어서 넘 재미있고, 실력도 금방 올랐어요!</S.ReviewItemText>
              <S.ReviewItemAuthor>봉미선(27)</S.ReviewItemAuthor>
            </S.ReviewItemContent>
            <S.ReviewVideoBox onClick={() => handleYoutubePlayer('uFWskJdruQ8')}>
              <S.ReviewItemImage src="https://i1.ytimg.com/vi/uFWskJdruQ8/sddefault.jpg" />
              <S.PlayBtn src={play_button} alt="play button" />
            </S.ReviewVideoBox>
          </S.ReviewItem>
          <S.ReviewItem>
            <S.ReviewItemContent>
              <S.ReviewItemTitle>같은 동네에 영어회화 스킬을 올려줄 튜터가 계신다니!</S.ReviewItemTitle>
              <S.ReviewItemText>코시국에 화상소통만 하면서 영어회화도 전화영어, 화상영어만 하다보니 너무 지루했는데 심심할 때마다 성격 맞고, 관심사가 비슷한 튜터님과 부담없는 금액으로 직접 만나 소통할 수 있어서 좋았어요!</S.ReviewItemText>
              <S.ReviewItemAuthor>남도일(19)</S.ReviewItemAuthor>
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
