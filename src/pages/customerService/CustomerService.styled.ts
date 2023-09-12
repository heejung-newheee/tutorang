import styled, { css } from 'styled-components';
import { colors } from '../../style/theme/colors';

export const CustomerServiceContainer = styled.div`
  /* 임시 css */
  box-sizing: border-box;
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Category = styled.nav`
  /* 임시 css */
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  padding: 0px 20px;
  margin-bottom: 40px;
`;

export const CategoryItem = styled.div<{ $pathType: string; $path: string }>`
  box-sizing: border-box;
  width: 200px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  ${({ $pathType, $path }) => {
    if ($pathType === $path) {
      return css`
        border-bottom: 3px solid ${colors.primary};
        color: ${colors.primary};
      `;
    } else {
      return css`
        border-bottom: 3px solid #eee;
        color: #000;
      `;
    }
  }}
  &:hover {
    cursor: pointer;
  }
`;

export const PostsContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-top: 3px solid #eee;
  padding: 0px 0px 20px;
`;
