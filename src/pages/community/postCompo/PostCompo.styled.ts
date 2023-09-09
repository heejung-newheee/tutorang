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
`;

export const UserWrite = styled.div`
  width: calc(100% - 200px);
  display: flex;
  flex-direction: column;
`;

export const UserImg = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

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
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
