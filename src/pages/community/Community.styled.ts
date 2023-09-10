import styled from 'styled-components';
import { colors } from '../../style/theme/colors';

export const CommunityContainer = styled.div`
  margin: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
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
    font-weight: 900;
    font-size: 25px;
  }

  & > p {
    font-size: 15px;
    color: ${colors.gray_900};
  }
`;
export const PostContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid ${colors.gray_900};
`;

export const Category = styled.div`
  width: 200px;
`;

export const CategoryColor = styled.div<{ $color: boolean }>`
  height: 70px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors.gray_900};
  font-size: 15px;
  color: ${(props) => (props.$color === true ? `${colors.primary}` : 'gray')};
  position: relative;
  cursor: pointer;

  & > span:last-child {
    font-size: 25px;
    position: absolute;
    right: 10px;
    top: 13px;
  }
`;

export const PostsContainer = styled.div`
  width: calc(100% - 200px);
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
`;

export const PostBtn = styled.button`
  padding: 10px 15px;
  background-color: ${colors.primary};
  color: ${colors.white};
  border: 1px solid ${colors.primary};
  border-radius: 3px;
  position: absolute;
  right: 0;
  bottom: -50px;

  &:hover {
    border: 1px solid ${colors.primary};
    color: ${colors.black_200};
    background-color: ${colors.white};
  }
`;
