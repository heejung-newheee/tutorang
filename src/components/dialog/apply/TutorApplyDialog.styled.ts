import styled from 'styled-components';
import { colors } from '../../../style/theme/colors';

export const Overlay = styled.div`
  position: fixed;
  z-index: 9;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
`;

export const Container = styled.div`
  position: relative;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Inner = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 32px;
  background-color: ${colors.white};
  border-radius: 18px;
  @media screen and (max-width: 1024px) {
    margin: 70px 0 0;
  }
  @media screen and (max-width: 768px) {
    margin: 50px 0 0;
    width: 100%;
    height: calc(100% - 50px);
    border-radius: 0;
    padding: 20px 10px 0;
  }
`;

export const ContentInner = styled.div`
  padding: 16px 50px 26px 50px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #f3f3f3;
  padding-bottom: 16px;
  padding: 16px 50px;
`;

export const Title = styled.h4`
  font-size: 20px;
  font-weight: 600;
`;

export const ButtonClose = styled.button`
  position: absolute;
  right: 50px;
  width: 16px;
  height: 16px;
  margin-top: -4px;
  & img {
    width: 100%;
    filter: invert(32%) sepia(5%) saturate(273%) hue-rotate(26deg) brightness(95%) contrast(85%);
  }
`;

export const InfoItem = styled.div`
  position: relative;
  margin-bottom: 8px;
`;
export const InfoTitle = styled.h6`
  display: inline-block;
  vertical-align: top;
  font-size: 16px;
  font-weight: 600;
  margin-right: 4px;
  margin-left: 10px;
`;

export const Line = styled.span`
  position: absolute;
  top: 3px;
  left: 0;
  content: '';
  width: 4px;
  height: 16px;
  background-color: #fe902f;
`;

export const InfoContent = styled.span`
  display: inline-block;
`;

export const Badge = styled.span`
  margin-left: 4px;
  padding: 2px 12px 3px 12px;
  border-radius: 30px;
  background-color: #fe902f;
  color: #fff;
`;

export const PriceItemList = styled.ul`
  display: inline-block;
`;

export const PriceItem = styled.li`
  position: relative;
`;

export const Dot = styled.span`
  position: relative;
  top: -3px;
  display: inline-block;
  content: '';
  width: 7px;
  height: 7px;
  border-radius: 10px;
  background-color: #000;
  margin: 0 6px;
`;

export const CertificateImage = styled.img`
  width: 100%;
  margin-top: 8px;
`;

export const DotState = styled.span`
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 10px;
  background-color: #fe902f;
  margin-right: 8px;
`;
