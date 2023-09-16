import { useQuery } from '@tanstack/react-query';
import { getReviewAuth } from '../../api/review';
import { reason, reasonMb } from '../../assets';
import StarRating from '../../components/common/StarRating';
import { Container, Section } from '../main/Main';
import UserReviewList from '../main/mainReviewList/UserReviewList';
import * as S from './MatchedReview.styled';

const MatchedReview = () => {
  const { data: reviews } = useQuery(['review_auth_info'], getReviewAuth);

  return (
    <S.ReviewContainer>
      <S.ReviewBanner>
        <S.BannerContainer>
          <S.BannerContent>
            <S.BannerTitle>100% 찐 후기들의 이야기</S.BannerTitle>
            <S.BannerText>
              튜터랑을 통해 만난 튜터와의 <br />
              수업 찐 후기 스토리
            </S.BannerText>
          </S.BannerContent>
        </S.BannerContainer>
      </S.ReviewBanner>
      <Section>
        <Container>
          <S.Title>튜터랑을 선택하는 이유는 무엇일까요?</S.Title>
          <S.Inner>
            <S.ReasonImg className="desk-top matched_review" src={reason} alt="reason" />
            <S.ReasonImg className="mobile matched_review" src={reasonMb} alt="reason" />
          </S.Inner>
        </Container>
      </Section>
      <S.UserReviewListWrapper>
        <UserReviewList />
      </S.UserReviewListWrapper>
      <Section>
        <Container>
          <S.Title>남녀노소 튜터랑의 진실된 후기</S.Title>
          <S.ReviewList>
            {reviews?.map((review) => {
              const rating = review.rating || 0;
              return (
                <S.ReviewItem key={review.id}>
                  <S.ReviewAuth>
                    <div>
                      <S.Avarta src={review.user_img as string} alt="user profile" />
                    </div>
                    <div>
                      <S.Name>
                        {review.author}
                        <span> ({review.user_age})</span>
                      </S.Name>
                      <S.Rating>{StarRating(rating)}</S.Rating>
                    </div>
                  </S.ReviewAuth>

                  <div>{review.content}</div>
                </S.ReviewItem>
              );
            })}
          </S.ReviewList>
        </Container>
      </Section>
    </S.ReviewContainer>
  );
};

export default MatchedReview;
