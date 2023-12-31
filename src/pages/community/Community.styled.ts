import styled from 'styled-components';
import { colors } from '../../style/theme/colors';

export const CommunityContainer = styled.div`
  margin: 20px;
  margin-bottom: 150px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;

  @media all and (max-width: 768px) {
    margin: 0;
    margin-bottom: 150px;
  }
`;

export const CommunityTitle = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  & > h1 {
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 25px;
  }

  & > p {
    font-size: 15px;
    color: ${colors.gray_900};
  }
`;

export const ResponsivMenu = styled.div`
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

  @media all and (max-width: 768px) {
    display: grid;
  }
`;

export const ResponsivMenuColor = styled.div<{ $color: boolean }>`
  background-color: ${(props) => (props.$color === true ? `${colors.primary}` : 'white')};
  color: ${(props) => (props.$color === true ? `${colors.white}` : 'gray')};
  cursor: pointer;

  & > a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const PostContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid ${colors.gray_200};

  @media all and (max-width: 768px) {
    justify-content: center;
    border-left: none;
    border-right: none;
    border-top: none;
  }
`;

export const Category = styled.div`
  width: 200px;

  @media all and (max-width: 768px) {
    display: none;
  }
`;

export const CategoryColor = styled.div<{ $color: boolean }>`
  height: 70px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors.gray_200};
  font-size: 15px;
  color: ${(props) => (props.$color === true ? `${colors.primary}` : 'gray')};
  position: relative;
  cursor: pointer;

  & > a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  & > span:last-child {
    font-size: 25px;
    position: absolute;
    right: 10px;
    top: 13px;
  }
`;

export const PostsContainer = styled.div`
  width: calc(100% - 200px);
  @media all and (max-width: 768px) {
    width: 100%;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
`;

export const PostBtn = styled.button`
  width: 40px;
  height: 40px;
  background-color: ${colors.primary};
  color: ${colors.white};
  border: 1px solid ${colors.primary};
  border-radius: 50%;
  position: absolute;
  right: 0;
  bottom: -50px;
  cursor: pointer;

  @media all and (max-width: 768px) {
    margin-right: 10px;
  }
`;
