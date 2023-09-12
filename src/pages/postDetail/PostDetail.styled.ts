import styled from 'styled-components';
import { colors } from '../../style/theme/colors';

export const Container = styled.div`
  margin-top: 150px;
`;

export const TitleWrap = styled.div`
  max-width: 1200px;
  padding: 20px;
  margin: 0 auto;
  margin-bottom: 30px;
`;

export const Title = styled.div`
  margin-bottom: 50px;
  padding-left: 10px;
  font-weight: 700;
  font-size: 25px;
  border-left: 4px solid ${colors.primary};
`;

export const PostuserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PosrUserImg = styled.div`
  display: flex;
  align-items: center;
  & > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

export const PostDate = styled.div`
  font-size: 13px;
  color: ${colors.gray};

  & > span {
    padding: 0 15px;
    cursor: pointer;
  }
  & > span:first-child {
    border-right: 1px solid ${colors.gray};
  }
`;

export const MainComments = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > p {
    text-align: center;
  }
  & > p > img {
    width: 80%;
  }
`;

export const LikeDiv = styled.div`
  max-width: 1200px;
  margin: 150px auto 100px auto;
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    width: 60px;
    height: 60px;
    border: 1px solid ${colors.gray};
    border-radius: 50%;
    position: relative;

    & > div {
      position: absolute;
      bottom: -22px;
      left: -21px;
    }
  }
`;

export const Line = styled.hr`
  border: 0.5px solid ${colors.gray_300};
  width: 100%;
  margin-top: 10px;
`;

export const CommentDiv = styled.div`
  max-width: 1200px;
  margin: 100px auto;
`;
export const ImgInputFlexDiv = styled.div`
  width: 80%;
  margin: 70px auto;
  display: flex;
  justify-content: center;
  align-items: center;

  @media all and (max-width: 768px) {
    width: 100%;
    padding: 0px 30px;
  }

  & > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

export const InputDiv = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.gray_900};
  border-radius: 5px;

  & > input {
    width: 90%;
    height: 90%;
    border: none;
    outline: none;
  }
`;
