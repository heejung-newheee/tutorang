import { styled } from 'styled-components';
import { colors } from '../../../style/theme/colors';

export const LikeTutorList = styled.ul`
  display: flex;
  overflow: hidden;
  margin: 20px 0;
`;

export const LikeTutorItem = styled.li`
  width: 250px;
  height: 250px;
  margin-right: 10px;
  background-color: #eee;
`;

export const TutorList = styled.ul`
  display: flex;
  overflow: hidden;
  margin: 20px 0;
`;
export const TutorItem = styled.li`
  margin: 10px 0;
  padding: 15px;
  border: solid 1px #eee;
  border-radius: 5px;
  img {
    width: 100%;
  }
`;

export const ReviewEditBtn = styled.div`
  position: relative;
  button {
    position: absolute;
    right: 0;
  }
`;
export const moreMenu = styled.ul`
  display: none;
  background-color: ${colors.white};
  border: 1px solid ${colors.primary};
  border-radius: 8px;
  overflow: hidden;
  margin-top: 28px;
  &.active {
    display: inline-block;
  }
`;

export const moreMenuItem = styled.li`
  padding: 8px 32px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.gray_100};
  }
`;
