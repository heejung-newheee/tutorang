import styled from 'styled-components';
import { colors } from '../../../style/theme/colors';
import { size } from '../../../style/theme/size';

export const Container = styled.section`
  background-color: ${colors.gray_100};
  margin-top: 70px;
  padding: 92px 0;
  @media all and (max-width: 768px) {
    margin-top: 50px;
  }
`;

export const TutorProfile = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 660px;
  margin: 0 auto;
`;

export const Figure = styled.figure`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 280px;
  height: 378px;
  border-radius: 15px;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & button {
    position: absolute;
    z-index: 5;
    top: 18px;
    right: 12px;
  }
  & button img {
    width: 24px;
    height: 24px;
  }
`;

export const ClassTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 58px;
`;

export const InfoWrapper = styled.div`
  margin-bottom: 58px;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: ${colors.black_200};
  margin-bottom: 10px;
`;

export const TutorNameWrapper = styled.div`
  margin-bottom: 18px;
`;

export const TutorName = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

export const Age = styled.span`
  font-size: 12px;
  color: ${colors.black_100};
  margin-right: 15px;
`;

export const verify = styled.span`
  font-size: 12px;
  color: ${colors.black_100};
  & img {
    transform: translateY(1px);
  }
`;

export const TutorInfoWrapper = styled.div`
  padding-left: 13px;
`;

export const InfoDetail = styled.p`
  font-size: 13px;
  color: ${colors.black_200};
`;

export const Icon = styled.img`
  max-width: 13px;
  margin-right: 4px;
  margin-top: -1px;
  filter: invert(26%) sepia(4%) saturate(12%) hue-rotate(18deg) brightness(89%) contrast(88%);
`;

export const TagList = styled.ul`
  & li {
    display: inline-block;
    font-size: 13px;
    padding: 4px 11px;
    border-radius: 30px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    margin-right: 8px;
  }
`;

export const PriceList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const PriceItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${colors.gray_900};
  padding: 6px 44px;
  font-size: 16px;
  margin-bottom: 7px;
`;

export const Dot = styled.span`
  display: inline-block;
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 8px;
  transform: translateY(-2px);
  background-color: ${colors.primary};
  margin-right: 14px;
`;

export const reportButton = styled.button`
  display: flex;
  align-items: center;
  margin-top: 4px;

  & img {
    margin-top: -2px;
    margin-right: 3px;
  }
`;

export const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 96px;

  & span {
    position: absolute;
    font-size: 12px;
    color: ${colors.white};
    background-color: ${colors.red};
    padding: 6px 12px;
    border-radius: 30px;
    transform: translate(110px, -18px);
  }
`;

export const badgeLevel = styled.span`
  display: flex;
  justify-content: center;
  background-color: ${colors.gray_200};
  padding: 2px 8px;
  border-radius: 30px;
  margin-left: 6px;
`;

export const OverviewContainer = styled.section`
  background-color: ${colors.gray_100};
  margin-top: 54px;
  padding: 88px 0 120px;
`;

export const OverviewList = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: ${size.globalInner};
  margin: 0 auto;
  padding: 64px 104px;
  background-color: ${colors.white};
  box-shadow: 0 4px 4px rgb(0 0 0 / 15%);
  border-radius: 8px;
`;

export const OverviewItem = styled.div`
  position: relative;
  text-align: center;
  & span {
    font-size: 13px;
  }

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    content: '';
    height: 139px;
    width: 2px;
    background-color: rgba(72, 72, 72, 0.8);
    @media screen and (max-width: 1024px) {
      height: 100%;
      background-color: #ececec;
    }
  }
  &:last-child::after {
    display: none;
  }
`;

export const OverviewItemNumber = styled.p`
  font-size: 31px;
  font-weight: 600;
  margin-bottom: 4px;
  @media screen and (max-width: 1024px) {
    font-size: 18px;
  }
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

export const OverviewItemIcon = styled.img`
  margin-bottom: 20px;
  margin-top: 7px;
  height: 37px;
`;
export const OverviewItemIcon2 = styled.img`
  filter: invert(73%) sepia(73%) saturate(2869%) hue-rotate(335deg) brightness(88%) contrast(104%);
  margin-bottom: 20px;
  margin-top: 7px;
  height: 37px;
`;

export const StarList = styled.ul`
  display: flex;
  align-items: center;
  padding-top: 10px;
  filter: invert(63%) sepia(97%) saturate(1441%) hue-rotate(336deg) brightness(100%) contrast(102%);
  li {
    width: 35px;
    img {
      width: 100%;
    }
  }
`;

export const StarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 37px;
  margin-bottom: 32px;
`;
