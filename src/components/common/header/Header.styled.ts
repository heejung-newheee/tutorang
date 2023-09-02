import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../../style/theme/colors';

export const Gnb = styled.div``;
export const NavContainer = styled.header`
  width: 100vw;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
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
export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  @media all and (max-width: 768px) {
    display: none;
  }
`;

export const LogoWrap = styled(Link)`
  display: flex;
  align-items: center;
`;

export const LogoH1 = styled.h1`
  margin-right: 10px;
  font-weight: 700;
  font-size: 20px;
  color: black;
  cursor: pointer;
`;

export const NavLogoImg = styled.img`
  width: auto;
  height: 25px;
  margin-right: 10px;
`;

export const NavLinkSt = styled(NavLink)`
  margin: 10px;
  font-size: 15px;
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

export const LoginBtn = styled.span`
  cursor: pointer;
  color: black;
  display: flex;
  align-items: center;

  @media all and (max-width: 768px) {
    display: none;
  }
`;

//로그인 했을 때
export const LoginBtnSignUp = styled.button`
  border: 1px solid ${colors.primary};
  margin-left: 15px;
  width: 122px;
  height: 40px;
  border-radius: 20px;
  &:hover {
    background-color: ${colors.primary};
    color: white;
  }
`;
//로그인 안 했을 때
export const LoginSignUpDiv = styled.div`
  display: flex;
  align-items: center;

  & > span {
    padding: 0 10px;
    font-size: 15px;
    color: ${colors.black};
  }

  & > span:first-child {
    border-right: 1px solid ${colors.gray_900};
  }
`;

// Mobile UI
export const MobileLogo = styled(Link)`
  font-weight: 700;
  font-size: 18px;
  color: black;
  display: none;
  cursor: pointer;

  & > div {
    display: flex;
    align-items: center;
  }

  @media all and (max-width: 768px) {
    display: block;
  }
`;

export const Hamburger = styled.button`
  display: none;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;
export const MobileLogoDiv = styled.div`
  padding: 20px;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > span {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }

  & > span > img {
    height: 25px;
    margin-right: 8px;
  }
`;

export const SignMobileWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin-bottom: 10px;

  & button:first-child {
    width: 110px;
    padding: 15px 22px;
    font-size: 14px;
    border-radius: 5px;
    background-color: ${colors.primary};
    color: ${colors.white};
  }

  & button:last-child {
    width: 110px;
    padding: 15px 22px;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid ${colors.primary};
    color: ${colors.primary};
  }
`;

export const MobileMenuWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 20px;
`;

export const GnbMobile = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const GnbMobileItemList = styled.li`
  width: 100%;
  font-size: 15px;
  padding: 10px 10px;
`;
