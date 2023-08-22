import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NavContainer = styled.div`
  width: 100vw;
  height: auto;
  background-color: black;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

export const WidthLimitContainer = styled.div`
  max-width: 1200px;
  height: 70px;
  padding: 0 10px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: saddlebrown;
  position: relative;

  @media only screen and (max-width: 730px) {
    height: 50px;
  }
`;

export const LogoWrap = styled.div`
  display: flex;
  align-items: center;

  //임시
  & > h1 {
    font-weight: 900;
    font-size: 20px;
    color: white;
    margin-right: 10px;
  }
  @media only screen and (max-width: 730px) {
    display: none;
  }
`;
export const Hamberger = styled.button`
  display: none;

  @media only screen and (max-width: 730px) {
    display: flex;
  }
`;

export const MiddleLogo = styled.div`
  font-weight: 900;
  font-size: 20px;
  color: white;
  display: none;
  position: absolute;
  left: 44%;

  @media only screen and (max-width: 730px) {
    display: flex;
  }
`;

export const NavLogoImg = styled.img`
  width: auto;
  height: 20px;
`;

export const NavLinkSt = styled(NavLink)`
  color: white;
  margin: 10px;
  &:link,
  &:focus,
  &:active,
  &:visited,
  &:hover {
    color: white;
  }
  &.active {
    color: red;
  }
`;

export const LoginBtn = styled.div`
  cursor: pointer;
  color: white;

  //임시
  & > span {
    margin-left: 10px;
  }
`;
