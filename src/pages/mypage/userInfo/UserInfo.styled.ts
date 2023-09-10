import styled from 'styled-components';
import { colors } from '../../../style/theme/colors';

export const ContentsDataBox = styled.div`
  max-height: 600px;
  min-height: 200px;
  background-color: #fff;
  overflow-y: scroll;
`;
export const DataList = styled.ul``;
export const DataItem = styled.li`
  margin: 10px 0;
  padding: 35px;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 17px;
`;

export const DataTitle = styled.h3`
  font-size: 21px;
  font-weight: bold;
  margin: 0 0 20px 0;
`;

export const DataContent = styled.p`
  font-size: 16px;
  margin: 0 0 25px 0;
`;

export const DataAuth = styled.p`
  font-size: 13px;
  color: #999;
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
  img {
    width: 30px;
    filter: invert(78%) sepia(45%) saturate(4904%) hue-rotate(337deg) brightness(102%) contrast(99%);
  }
`;

export const MypageContainer = styled.section`
  margin-top: 70px;
  @media all and (max-width: 768px) {
    margin-top: 50px;
  }
`;
export const ProfileBox = styled.section`
  text-align: center;
  background-color: ${colors.primary};
  position: relative;
  height: 528px;
  padding-top: 45px;
  border-radius: 0 0 40px 40px;
  @media only screen and (max-width: 1024px) {
    padding-top: 30px;
    height: 350px;
    border-radius: 0 0 20px 20px;
  }
  @media only screen and (max-width: 768px) {
    padding-top: 25px;
    height: 269px;
    border-radius: 0 0 0 0;
  }
`;
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
export const ProfileImg = styled.div`
  width: 236px;
  height: 236px;
  margin: 0 auto;
  position: relative;
  margin-bottom: 20px;
  overflow: hidden;
  @media only screen and (max-width: 1024px) {
    width: 150px;
    height: 150px;
  }
  @media only screen and (max-width: 768px) {
    width: 104px;
    height: 104px;
  }
`;
export const UserImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
export const EditBtn = styled.button`
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  @media only screen and (max-width: 1024px) {
    width: 30px;
    height: 30px;
    right: 8px;
    bottom: 8px;
  }
  @media only screen and (max-width: 768px) {
    width: 30px;
    height: 30px;
    right: 0px;
    bottom: 0px;
  }
`;
export const UserName = styled.p`
  font-size: 22px;
  font-weight: bold;
  margin: 17px 0;
  color: #fff;
  span {
    font-size: 13px;
    line-height: 1;
    font-weight: bold;
    color: #e5e5e5;
  }
  @media only screen and (max-width: 768px) {
    margin: 5px 0;
    font-size: 16px;
  }
`;
export const TutorLocationBox = styled.div`
  display: flex;
  font-size: 13px;
  width: 50%;
  height: 16px;
  color: #fff;
  margin: 0 auto;
  justify-content: center;
  img {
    height: 100%;
    margin: 0 3px 0 7px;
    position: relative;
    top: 1.5px;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const Summary = styled.div`
  width: 100%;
  max-width: 800px;
  min-height: 180px;
  padding: 30px 50px;
  border-radius: 40px;
  background-color: #fff;
  margin: 40px 0;
  justify-content: space-between;
  align-items: center;
  display: flex;
  text-align: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  position: absolute;
  left: 50%;
  bottom: -125px;
  transform: translate(-50%, 0);
  @media only screen and (max-width: 1024px) {
    height: 111px;
    min-height: auto;
    width: 90%;
    border-radius: 8px;
    padding: 0;
    bottom: -58px;
    margin: 0px 0;
  }
`;
export const SummaryItem = styled.div`
  width: 33.3333%;
  &:not(:last-child) {
    border-right: solid 1px #c8c8c8;
  }
  p:first-child {
    padding-bottom: 30px;
    font-size: 31px;
    font-weight: bold;
    @media screen and (max-width: 1024px) {
      padding-bottom: 14px;
      font-size: 20px;
    }
    @media only screen and (max-width: 768px) {
      padding-bottom: 10px;
    }
  }
  p:last-child {
    font-size: 13px;
    @media screen and (max-width: 1024px) {
      font-size: 10px;
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
export const MatchBtn = styled.button`
  display: inline-block;
  font-size: 16px;
  line-height: 32px;
  padding: 0 18px;
  margin: 0 5px;
  border-radius: 20px;
  border: solid 1px #000;
  transition: all 0.3s;
  &:hover {
    background-color: ${colors.primary};
    color: #fff;
    border: solid 1px ${colors.primary};
  }
  @media screen and (max-width: 1024px) {
    padding: 0 15px;
    margin: 3px 0;
  }
`;

export const EmptyMypage = styled.div`
  height: 120px;
  @media screen and (max-width: 1024px) {
    height: 50px;
  }
`;
