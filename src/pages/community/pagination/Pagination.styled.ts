import styled from 'styled-components';
import { colors } from '../../../style/theme/colors';

export const PaginationDiv = styled.div`
  display: flex;
  justify-content: center;
  color: gray;
  gap: 10px;
  left: 50%;
  position: absolute;
  bottom: -100px;
  transform: translate(-50%, 0);
`;
export const LessGreaterThan = styled.div`
  font-size: 25px;
  cursor: pointer;

  &:hover {
    color: ${colors.primary};
  }
`;

export const PostBtn = styled.button`
  position: absolute;
  right: 0;
  bottom: -30px;
`;

export const CurrentNumberDiv = styled.div`
  width: 25px;
  height: 25px;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: white;
  border: none;
  border-radius: 3px;
  background-color: ${colors.primary};
  cursor: pointer;
`;

export const PageNmberDiv = styled.div`
  width: 120px;
  margin: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TotalPageNum = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
`;
