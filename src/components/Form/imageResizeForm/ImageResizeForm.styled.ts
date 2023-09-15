import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Inner = styled.div`
  position: relative;

  width: 600px;
  margin: 0 32px;
  background-color: #fff;
  border-radius: 18px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    margin: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.p`
  font-size: 18px;
  display: flex;
  align-items: center;
`;

export const IconButton = styled.button`
  display: flex;
  padding: 0.25rem;
  margin: 0;
  border-radius: 50%;
  &:hover,
  &:hover,
  &:focus,
  &:focus-within {
    background-color: #e7e7e7;
  }
`;

export const Body = styled.div``;
