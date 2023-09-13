import { styled } from 'styled-components';

export const WriteContainer = styled.div`
  /* display: flex;
  justify-content: center;
  flex-direction: column; */
  margin-top: 100px;
  padding: 0 20px;
`;

export const Title = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid gray;
  margin-bottom: 20px;
  & > input {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
  }
`;

export const SubmitBtn = styled.button`
  position: fixed;
  right: 20px;
  top: 15px;
  z-index: 100000;
  border: 1px solid gray;
  padding: 10px 20px;
`;

export const BackBtn = styled.button`
  position: fixed;
  left: 20px;
  top: 15px;
  z-index: 100000;
  border: 1px solid gray;
  padding: 10px 20px;
`;
