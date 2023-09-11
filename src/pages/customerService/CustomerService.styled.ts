import styled from 'styled-components';
import { colors } from '../../style/theme/colors';

export const CustomerServiceContainer = styled.div`
  /* 임시 css */
  box-sizing: border-box;
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  min-height: 1160px;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export const Category = styled.nav`
  /* 임시 css */
  box-sizing: border-box;
  width: 200px;
  height: 100%;
  min-height: 1160px;
  border: 1px solid #cdcdcd;
  display: flex;
  flex-direction: column;
`;

export const CategoryItem = styled.div<{ $pathType: string; $path: string }>`
  /* 임시 css */
  box-sizing: border-box;
  width: 200px;
  height: 65px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  border-bottom: 1px solid #cdcdcd;
  color: ${({ $pathType, $path }) => {
    if ($pathType === $path) return `${colors.primary}`;
    else `#000`;
  }};
  &:hover {
    cursor: pointer;
  }
  /* width: 100%; */
  /* height: 100%; */
`;

export const PostsContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%; // 왜 안돼......ㅜ
  border: 1px solid #cdcdcd;
  border-left: none;
`;
