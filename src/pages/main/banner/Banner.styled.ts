import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { main_banner } from '../../../assets';
import { colors } from '../../../style/theme/colors';

export const BannerSection = styled.section`
  background-image: url(${main_banner});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 1300px) {
    height: 700px;
    padding: 50px;
  }
`;
export const BannerContainer = styled.div`
  max-width: 1200px;
  height: 551px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-top: 70px;
  @media screen and (max-width: 1300px) {
    height: 700px;
    padding: 50px;
  }
`;
export const BannerContent = styled.div`
  position: relative;
  top: 15%;
  transform: translate(0, -50%);
  @media screen and (max-width: 1300px) {
    top: 0;
  }
`;

export const BannerTitle = styled.p`
  font-size: 40px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
`;
export const BannerText = styled.p`
  font-weight: bold;
  color: #fff;
  margin-bottom: 40px;
`;
export const BannerBtn = styled(Link)`
  background-color: #fff;
  font-weight: bold;
  color: ${colors.primary}!important;
  padding: 8px 50px;
  margin-top: 45px;
  border-radius: 30px;
  img {
    position: relative;
    top: 1px;
    left: 5px;
  }
`;