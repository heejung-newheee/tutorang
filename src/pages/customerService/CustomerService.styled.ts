import styled, { css } from 'styled-components';
import { colors } from '../../style/theme/colors';

export const CustomerServiceContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ResponsivMenu = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-top: 1px solid ${colors.gray_200};
  display: none;
  & > div {
    padding: 20px 0;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid ${colors.gray_200};
    border-right: 1px solid ${colors.gray_200};
  }

  & > div:nth-child(2) {
    border-right: none;
  }
  & > div:nth-child(4) {
    border-right: none;
  }

  @media screen and (max-width: 420px) {
    margin-top: 25px;
    display: grid;
  }
`;

export const ResponsivMenuItem = styled.div<{ $pathType: string; $path: string }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  ${({ $pathType, $path }) => {
    if ($pathType === $path) {
      return css`
        background-color: ${colors.primary};
        color: ${colors.white};
      `;
    } else {
      return css`
        background-color: ${colors.white};
        color: gray;
      `;
    }
  }}
  &:hover {
    cursor: pointer;
  }
`;

export const Category = styled.nav`
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  padding: 0px 20px;
  margin-bottom: 40px;
  @media screen and (max-width: 420px) {
    display: none;
  }
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
  @media screen and (max-width: 420px) {
    border-top: none;
  }
`;
