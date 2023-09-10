import styled from 'styled-components';
import { colors } from '../../../style/theme/colors';

export const Post = styled.div<{ $lastElement: boolean }>`
  width: 100%;
  height: 280px;
  padding: 20px;
  display: flex;
  border-left: 1px solid ${colors.gray_900};
  border-bottom: ${(props) => (props.$lastElement === true ? 'none' : `1px solid ${colors.gray_900}`)};
  position: relative;

  @media all and (max-width: 768px) {
    border-left: none;
    height: auto;
  }
`;

export const UserWrite = styled.div`
  width: calc(100% - 200px);
  display: flex;
  flex-direction: column;

  @media all and (max-width: 768px) {
    width: 100%;
  }
`;

export const UserImg = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media all and (max-width: 768px) {
    display: none;
  }

  & > img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

export const NameImgDiv = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

export const ImgDiv = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
  object-fit: cover;
`;

export const DateNameDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > span:last-child {
    font-size: 12px;
    color: gray;
  }
`;

export const TitleTextDiv = styled.div`
  @media all and (max-width: 768px) {
    margin-bottom: 50px;
  }
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Text = styled.p`
  font-size: 15px;
  line-height: 1.6rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media all and (max-width: 768px) {
    text-overflow: clip;
    white-space: normal;
  }
`;

export const ResponsiveImg = styled.div`
  display: none;
  margin-bottom: 30px;

  & > div {
    display: flex;
    align-items: center;
  }
  & > div > img {
    width: 120px;
    height: 120px;
    margin-right: 10px;
    object-fit: cover;
  }

  @media all and (max-width: 768px) {
    display: block;
    width: 100%;
  }
`;

export const Like = styled.div`
  position: absolute;
  bottom: 10px;
  & > span {
    font-size: 13px;
    color: gray;
    margin-right: 10px;
  }
`;
