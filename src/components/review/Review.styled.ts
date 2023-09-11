import styled from 'styled-components';
import { colors } from '../../style/theme/colors';
import { size } from '../../style/theme/size';

export const Container = styled.div`
  background-color: ${colors.gray_100};
  padding: 49px 0 70px 0;

  @media screen and (max-width: 768px) {
    padding: 18px 18px;
    margin-top: 13px;
  }
`;

export const ReviewContainer = styled.ul`
  width: ${size.globalInner};
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const TitleContainer = styled.div`
  width: ${size.globalInner};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 44px;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0 18px 10px 0;
    margin-bottom: 0;
    margin-top: 0;
  }
`;

export const Title = styled.h4`
  font-size: 28px;
  color: ${colors.black};
  font-weight: 600;

  @media screen and (max-width: 768px) {
    font-size: 22px;
  }
`;

export const BadgeReviewCount = styled.span`
  font-size: 20px;
  color: ${colors.primary};
`;

export const ReviewItem = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 33px 41px;
  background-color: ${colors.white};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
`;
export const ReviewContent = styled.div`
  width: 70%;
`;
export const ReviewTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

export const ReviewDescription = styled.p`
  font-size: 16px;
  line-height: 28px;
  color: ${colors.black_opacity_60};
`;

export const ReviewStar = styled.li`
  filter: invert(63%) sepia(97%) saturate(1441%) hue-rotate(336deg) brightness(100%) contrast(102%);

  & img {
    width: 36px;
  }
`;

export const AuthorInfo = styled.div`
  margin-top: 38px;
  color: #555454;
  opacity: 0.6;
  font-size: 15px;
`;

export const ButtonMoreWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: end;
  z-index: 9;
  top: 33px;
  right: 41px;
`;

export const moreMenu = styled.ul`
  display: none;
  background-color: ${colors.white};
  border: 1px solid ${colors.primary};
  border-radius: 8px;
  overflow: hidden;
  margin-top: 8px;

  &.active {
    display: inline-block;
  }
`;

export const moreMenuItem = styled.li`
  padding: 8px 32px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.gray_100};
  }
`;

export const Time = styled.span`
  color: #555454;
  opacity: 0.6;
  margin-left: 15px;
`;
