import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NavContainer = styled.div`
  width: 100vw;
  height: auto;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 4px 4px -4px black;
  z-index: 555;
`;

export const WidthLimitContainer = styled.div`
  max-width: 1200px;
  height: 70px;
  padding: 0 10px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  position: relative;

  @media only screen and (max-width: 1200px) {
    padding: 0 30px;
  }

  @media only screen and (max-width: 768px) {
    height: 50px;
  }
`;

export const LogoWrap = styled.div`
  display: flex;
  align-items: center;

  & > img {
    margin-right: 10px;
    width: 36px;
    height: 36px;
  }

  //임시
  & > h1 {
    font-weight: 900;
    font-size: 20px;
    color: black;
    margin-right: 10px;
  }
  @media all and (max-width: 768px) {
    display: none;
  }
`;
export const Hamberger = styled.button`
  display: none;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

export const MiddleLogo = styled.div`
  font-weight: 900;
  font-size: 20px;
  color: black;
  display: none;
  cursor: pointer;

  & > div {
    display: flex;
    align-items: center;
  }
  /* position: absolute;
  left: 44%; */
  @media all and (max-width: 768px) {
    display: block;
  }
`;

export const NavLogoImg = styled.img`
  width: auto;
  height: 20px;
  margin-right: 5px;
`;

export const NavLinkSt = styled(NavLink)`
  margin: 10px;
  opacity: 0.7;
  &:link,
  &:focus,
  &:active,
  &:visited,
  &:hover {
    color: black;
  }
  &.active {
    color: #fe902f;
  }
`;

export const LoginBtn = styled.div`
  cursor: pointer;
  color: black;
  display: flex;
  align-items: center;

  @media all and (max-width: 768px) {
    display: none;
  }
`;

export const LoginBtnSignUp = styled.button`
  border: 1px solid #fe902f;
  margin-left: 15px;
  width: 122px;
  height: 40px;
  border-radius: 20px;
  &:hover {
    background-color: #fe902f;
    color: white;
  }
`;

// export const HiddenBarDiv = styled.div`
//   position: fixed;
//   width: 30%;
//   /* height: 100%; */
//   right: 0;
//   bottom: 0;
//   top: 0;
//   background-color: aquamarine;
// `;
