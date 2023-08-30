import styled from 'styled-components';
import { colors } from '../../style/theme/colors';
import { size } from '../../style/theme/size';

export const Container = styled.div`
  background-color: ${colors.gray_100};
  padding: 49px 0 70px 0;
`;

export const ReviewContainer = styled.ul`
  width: ${size.globalInner};
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  padding: 36px 48px;
  background-color: ${colors.white};
`;

export const TitleContainer = styled.div`
  width: ${size.globalInner};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 44px;
`;

export const Title = styled.h4`
  font-size: 28px;
  color: ${colors.black};
  font-weight: 600;
`;

export const BadgeReviewCount = styled.span`
  font-size: 20px;
  color: ${colors.primary};
`;

export const ReviewItem = styled.li`
  margin-top: 20px;
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
