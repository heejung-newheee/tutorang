import styled from 'styled-components';

export const WelcomeContainer = styled.div`
  box-sizing: border-box;
  padding: 40px 0;
  margin: 0 auto;
  width: 570px;
  height: 680px;
  border-radius: 3px;
  @media screen and (max-width: 420px) {
    width: 320px;
    height: 400px;
  }
`;

export const WelcomeHeader = styled.header`
  background-color: #f5f5f5;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 134px;
    position: relative;
    left: -20px;
  }
  border-bottom: 1.5px solid #ffd0a8;

  @media screen and (max-width: 420px) {
    height: 70px;
    & img {
      width: 100px;
    }
  }
`;

export const WelcomeBody = styled.div`
  background-color: #f5f5f5;
  height: 400px;
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  & p {
    color: #585858;
  }
  @media screen and (max-width: 420px) {
    height: 240px;
    padding-top: 54px;
    & p {
      font-size: 14px;
      color: #585858;
      padding: 0 45px;
      text-align: center;
    }
  }
`;

export const WelcomeButton = styled.button`
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  background-color: #fe902f;
  color: #fff;
  border-radius: 0 0 3px 3px;
`;
