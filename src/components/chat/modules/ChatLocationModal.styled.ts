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

export const LocationForm = styled.div`
  display: flex;
  padding: 1rem 0;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LocationNameWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.25rem;
`;

export const LocationNameInput = styled.input`
  outline: none;
  border: 2px solid #fe902f;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1rem;
  text-indent: 0.5rem;
  flex: 1;
  min-width: 0;
`;

export const Button = styled.button`
  background-color: #fe902f;
  border-radius: 5px;
  padding: 0.5625rem 1rem;
  font-size: 1rem;
  color: #fff;
  white-space: nowrap;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
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
