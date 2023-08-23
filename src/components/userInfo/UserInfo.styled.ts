import styled from 'styled-components';

export const MypageContainer = styled.section`
  padding: 10px;
`;
// 공통
export const ProfileBox = styled.div`
  width: 125px;
  height: 125px;
  background-color: #eee;
  border-radius: 5px;
  margin-bottom: 20px;
  overflow: hidden;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const UserName = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  span {
    font-size: 0.9rem;
    font-weight: bold;
    color: #888;
    text-transform: uppercase;
  }
`;

export const StudyInfoBox = styled.div`
  display: flex;
  padding: 20px;
  border-radius: 5px;
  background-color: #eee;
  margin: 20px 0;
  text-align: center;
  justify-content: space-between;
`;
