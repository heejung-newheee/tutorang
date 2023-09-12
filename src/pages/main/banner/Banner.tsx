import { arrow_right } from '../../../assets';
import * as S from './Banner.styled';

const Banner = () => {
  return (
    <S.BannerSection>
      <S.BannerContainer>
        <S.BannerContent>
          <S.BannerTitle>
            나와 가까운 튜터를
            <br />
            쉽고 빠르게 만나보세요
          </S.BannerTitle>
          <S.BannerText>
            가까운 지역에서, 내가 원하는 튜터를 골라
            <br /> 간편하게 회화를 배워보는 튜터랑
          </S.BannerText>
          <S.BannerBtn to={`/list`}>
            튜터 만나러 가기
            <img src={arrow_right} alt="button" />
          </S.BannerBtn>
        </S.BannerContent>
      </S.BannerContainer>
    </S.BannerSection>
  );
};

export default Banner;
