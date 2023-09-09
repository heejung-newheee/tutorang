import styled from 'styled-components';
import { reviewTop } from '../../assets';
import { colors } from '../../style/theme/colors';
export const ReviewContainer = styled.div`
  margin-top: 70px;
  @media all and (max-width: 768px) {
    margin-top: 50px;
  }
`;
export const Inner = styled.div`
  max-width: 890px;
  margin: 0 auto;
  img {
    margin: 0 auto;
  }
`;
export const Title = styled.h2`
  display: inline-block;
  font-size: 28px;
  margin: 0 0 98px 0;
  padding: 0 0 0 10px;
  font-weight: bold;
  line-height: 1;
  border-left: 6px solid ${colors.primary};
  position: relative;
  left: 50%;
  transform: translate(-50%, 0px);
  @media screen and (max-width: 768px) {
    margin: 0 0 50px 0;
    font-size: 18px;
  }
`;
// 배너
export const ReviewBanner = styled.div`
  background-image: url(${reviewTop});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 700px;

  @media screen and (max-width: 1300px) {
    height: 500px;
    padding: 50px;
  }
  @media screen and (max-width: 768px) {
    height: 400px;
    padding: 50px 30px;
    text-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }
`;
export const BannerContainer = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  position: relative;
`;
export const BannerContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: absolute;
  bottom: 17%;
  color: #fff;
  font-weight: bold;
  @media screen and (max-width: 1024px) {
    bottom: 10%;
  }

  @media screen and (max-width: 768px) {
    bottom: 2%;
  }
`;
//
export const BannerTitle = styled.div`
  font-size: 25px;
  margin-bottom: 15px;
  @media screen and (max-width: 768px) {
    margin-bottom: 8px;
    font-size: 12px;
  }
`;
export const BannerText = styled.div`
  font-size: 42px;
  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`;
export const ReasonImg = styled.img`
  width: 100%;
  padding: 0 90px 90px 90px;
  &.desk-top {
    display: block;
  }
  &.mobile {
    display: none;
  }
  @media screen and (max-width: 768px) {
    padding: 0 25px 25px 20px;
    &.desk-top {
      display: none;
    }
    &.mobile {
      display: block;
    }
  }
`;
export const ReviewList = styled.div`
  column-count: 3;
  column-gap: 30px;
  padding: 30px;
  @media screen and (max-width: 768px) {
    column-count: 2;
  }
  @media screen and (max-width: 768px) {
    column-count: 2;
  }
  @media screen and (max-width: 596px) {
    column-count: 1;
  }
`;

export const ReviewItem = styled.div`
  /* width: calc((100% - 30px) / 4); */
  display: inline-block; // 2
  width: 100%; // 3
  break-inside: avoid;
  margin-bottom: 50px;
`;

export const ReviewAuth = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;
export const Avarta = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 15px;
`;
export const Name = styled.div`
  font-weight: bold;
  span {
    font-size: 0.8rem;
    font-weight: normal;
    color: #3a3a3a;
  }
`;
export const Rating = styled.div`
  img {
    width: 13px;
    filter: invert(63%) sepia(97%) saturate(1441%) hue-rotate(336deg) brightness(100%) contrast(102%);
  }
`;
