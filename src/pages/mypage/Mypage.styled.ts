import styled from 'styled-components';
import { colors } from '../../style/theme/colors';
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
export const Section = styled.section`
  padding: 100px 10px;
  box-sizing: border-box;
  @media screen and (max-width: 768px) {
    padding: 50px 20px;
  }
`;
export const ContentsDataBox = styled.div`
  max-height: 600px;
  min-height: 200px;
  border-radius: 8px;
  background-color: #fff;
  overflow-y: auto;
`;
export const DataList = styled.ul``;
export const DataItem = styled.li`
  position: relative;
  margin: 10px 0;
  padding: 35px;
  /* border-radius: 8px; */
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 17px;
  border-top: solid 1px #efefef;
  &:first-child {
    border-top: 0;
  }
  div:first-child {
    width: 70%;
    @media all and (max-width: 768px) {
      width: 90%;
    }
  }
`;

export const DataTitle = styled.h3`
  font-size: 21px;
  font-weight: bold;
  margin: 0 0 20px 0;
  @media all and (max-width: 768px) {
    font-size: 18px;
  }
`;

export const DataContent = styled.p`
  font-size: 16px;
  margin: 0 0 25px 0;
  @media all and (max-width: 768px) {
    font-size: 14px;
  }
`;

export const DataAuth = styled.p`
  font-size: 13px;
  color: #999;
  @media all and (max-width: 768px) {
    font-size: 12px;
  }
`;
export const DataStar = styled.div`
  img {
    width: 16px;
    filter: invert(48%) sepia(0%) saturate(2647%) hue-rotate(312deg) brightness(93%) contrast(76%);
  }
`;
export const ReviewRating = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 5px;
  margin-left: 30px;
  @media all and (max-width: 1024px) {
    gap: 3px;
    margin-left: 0;
    margin-top: 5px;
  }
  img {
    width: 30px;
    filter: invert(78%) sepia(45%) saturate(4904%) hue-rotate(337deg) brightness(102%) contrast(99%);
    @media all and (max-width: 768px) {
      width: 15px;
    }
  }
`;

export const InfoSection = styled.section`
  background-color: ${colors.gray_100};
  padding: 55px 10px;
  margin: 40px 0;
`;

export const InfoTitle = styled.h2`
  font-size: 28px;
  line-height: 1;
  font-weight: bold;
  margin-bottom: 40px;
  padding-left: 15px;
  border-left: solid 6px ${colors.primary};
`;
export const InfoNull = styled.p`
  color: #bebebe;
`;

export const EmptyMypage = styled.div`
  height: 120px;
  @media screen and (max-width: 1024px) {
    height: 50px;
  }
`;
