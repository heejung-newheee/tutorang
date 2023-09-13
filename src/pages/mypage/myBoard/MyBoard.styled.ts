import styled from 'styled-components';
import { colors } from '../../../style/theme/colors';

export const Post = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  cursor: pointer;
  @media all and (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`;

export const ContentsImg = styled.div`
  width: 100px;
  img {
    width: 100%;
    object-fit: cover;
  }
  @media all and (max-width: 768px) {
    margin-bottom: 0px;
  }
`;

export const ContentsText = styled.div``;
export const Time = styled.p`
  color: ${colors.gray_900};
  font-size: 0.8rem;
`;
export const Title = styled.h1`
  font-weight: 700;
  font-size: 20px;
  margin: 15px 0 0;
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

export const Like = styled.div`
  padding-top: 20px;
  font-size: 13px;
  color: gray;
  span {
    margin-right: 10px;
  }
`;
