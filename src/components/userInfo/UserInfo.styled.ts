import styled from 'styled-components';

export const MypageContainer = styled.section`
  /* padding: 10px; */
  margin-top: 70px;
`;
export const ProfileBox = styled.section`
  text-align: center;
  background-color: #fe902f;
  position: relative;
  height: 528px;
  padding-top: 45px;
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
`;
export const UserName = styled.p`
  font-size: 22px;
  font-weight: bold;
  margin: 17px 0;
  color: #fff;
  span {
    font-size: 13px;
    font-weight: bold;
    color: #e2e2e2;
    /* text-transform: uppercase; */
  }
`;
export const TutorLocationBox = styled.div`
  display: flex;
  font-size: 13px;
  width: 175px; //강제로 너비값 넣어둠
  height: 16px;
  color: #fff;
  margin: 0 auto;
  img {
    height: 100%;
  }
`;

export const Summary = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 244px;
  padding: 62px;
  border-radius: 40px;
  background-color: #fff;
  margin: 40px 0;
  justify-content: space-between;
  align-items: center;
  display: flex;
  text-align: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  position: absolute;
  bottom: -170px;
`;
export const SummaryItem = styled.div`
  width: 33.3333%;
  &:not(:last-child) {
    border-right: solid 1px #c8c8c8;
  }
  p:first-child {
    padding-top: 25px;
    padding-bottom: 30px;
    font-size: 31px;
    font-weight: bold;
  }
  p:last-child {
    padding-bottom: 25px;
    font-size: 13px;
  }
`;

export const InfoSection = styled.section`
  background-color: #f8f8f8;
  padding: 55px 0;
  margin: 40px 0;
`;
export const InfoList = styled.ul``;
export const InfoItem = styled.li`
  display: flex;
  text-align: center;
  height: 99px;
  align-items: center;
  border-top: solid 1px #dbd9d8;
  > div {
    width: 20%;
  }
`;
export const InfoTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 40px;
`;
export const MatchBtn = styled.button`
  display: inline-block;
  font-size: 16px;
  line-height: 32px;
  padding: 0 18px;
  border-radius: 20px;
  border: solid 1px #000;
  transition: all 0.4s;
  &:hover {
    background-color: #fe902f;
    color: #fff;
    border: solid 1px #fe902f;
  }
`;
