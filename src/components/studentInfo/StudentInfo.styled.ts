import { styled } from 'styled-components';

// 찜한 강사 리스트
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
// 수업완료 강사리스트
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
