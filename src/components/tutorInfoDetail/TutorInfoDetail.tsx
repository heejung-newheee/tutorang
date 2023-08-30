import { useQuery } from '@tanstack/react-query';
import * as S from './TutorInfoDetail.styled';
import { matchTutor } from '../../api/tutor';
import { icon_check, icon_class, icon_info, icon_like, icon_location_gray, icon_school, icon_verify, starEmpty, starFull, starHalf } from '../../assets';
import { Button } from '..';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modules';
import { useReviewAverage } from '../../hooks';

type TutorDetailProps = {
  id: string | undefined;
};

const TutorInfoDeatail = ({ id }: TutorDetailProps) => {
  if (!id) return;
  const dispatch = useDispatch();
  const { data: tutors, isLoading, isError, error } = useQuery(['tutorDetail'], () => matchTutor(id));

  //별점
  const stars = [1, 2, 3, 4, 5];
  // const [rating, setRating] = useState(prevReview?.rating || 0);

  //별점 평균
  const reviewAverage = useReviewAverage([1, 2]);

  const decimalPoint = Math.floor(reviewAverage * 10) % 10;

  const starRating = (currentRate: number) => {
    if (reviewAverage >= currentRate) {
      return <img src={starFull} alt={`Full Star`} />;
    }

    return <img src={starEmpty} alt={`Empty Star`} />;
  };

  const handleOpenReport = () => {
    dispatch(openModal({ type: 'report' }));
  };

  return (
    <>
      {/* 튜터데이터 */}
      <section>
        {tutors?.map((tutor) => {
          return (
            <S.Container key={tutor.tutor_info_id}>
              <S.TutorProfile>
                <div>
                  <S.Figure>
                    <img src={`${tutor.tutor_img}`} alt={`${tutor.tutor_name} 프로필 이미지`} />
                    <button>찜하기</button>
                  </S.Figure>
                  <S.reportButton onClick={handleOpenReport}>
                    <img src={icon_info} />
                    신고하기
                  </S.reportButton>
                </div>

                <div>
                  <S.ClassTitle>{tutor.class_info}</S.ClassTitle>
                  <S.InfoWrapper>
                    <S.TutorNameWrapper>
                      <S.TutorName>
                        {tutor.tutor_name} <S.Age>(나이)</S.Age>
                      </S.TutorName>
                      <S.verify>
                        <S.Icon src={icon_verify} />
                        학력인증
                      </S.verify>
                    </S.TutorNameWrapper>
                    <S.TutorInfoWrapper>
                      <p>
                        <S.Icon src={icon_location_gray} /> 서울 | 강남구
                      </p>
                      <p>
                        <S.Icon src={icon_school} /> 서울대 | 영어영문학과
                      </p>
                      <p>
                        <S.Icon src={icon_check} />
                        한국어, 영어 가능
                      </p>
                      <p>
                        <S.Icon src={icon_check} />
                        언어 난이도 <S.badgeLevel>중</S.badgeLevel>
                      </p>
                      <S.TagList>
                        <li>#열정적인</li>
                        <li>#외향적인</li>
                        <li>#개성있는</li>
                      </S.TagList>
                    </S.TutorInfoWrapper>
                  </S.InfoWrapper>
                  <S.PriceList>
                    <S.PriceItem>
                      <span>
                        <S.Dot />
                        30분 화상 만남
                      </span>
                      <span>5,000원</span>
                    </S.PriceItem>
                    <S.PriceItem>
                      <span>
                        <S.Dot />
                        30분 직접 만남
                      </span>
                      <span>5,000원</span>
                    </S.PriceItem>
                  </S.PriceList>
                </div>
              </S.TutorProfile>

              <S.ButtonWrapper>
                <Button variant="solid" color="primary" size="Medium">
                  튜터랑 대화하기
                </Button>
                <span>바로 상담가능</span>
              </S.ButtonWrapper>
            </S.Container>
          );
        })}
      </section>

      {/* 튜터 overview */}
      <S.OverviewContainer>
        <S.OverviewList>
          <S.OverviewItem>
            <p>
              <S.StarList>
                {stars.map((star) => {
                  return <li>{starRating(star)}</li>;
                })}
              </S.StarList>
              / 5.0
            </p>
            <span>리뷰 평점</span>
          </S.OverviewItem>
          <S.OverviewItem>
            <img src={icon_like} alt="리뷰 아이콘" />
            <p>8,172건</p>
            <span>리뷰 수</span>
          </S.OverviewItem>
          <S.OverviewItem>
            <img src={icon_class} alt="매칭 아이콘" />
            <p>30번</p>
            <span>매칭 횟수</span>
          </S.OverviewItem>
        </S.OverviewList>
      </S.OverviewContainer>
    </>
  );
};

export default TutorInfoDeatail;
