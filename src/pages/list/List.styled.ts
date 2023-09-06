import styled from 'styled-components';
import { colors } from '../../style/theme/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;

export const TutorList = styled.div`
  width: 100%;
  margin-top: 100px;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const InnerModal = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media all and (min-width: 0px) and (max-width: 600px) {
    align-items: end;
  }
`;

export const SearchWrap = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  margin-top: 50px;
  color: ${colors.white};
  padding: 0 20px;
  background-color: #f5f5f5;
  /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
  border-radius: 8px;

  & > input {
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
    padding-left: 20px;
    font-size: 1em;
    border-radius: 8px;
    background-color: #f5f5f5;
  }
`;

export const ShowIsDataNone = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
