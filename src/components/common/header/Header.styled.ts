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
    padding: 0 20px 0 15px;
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
  height: 35px;
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
  color: black;
  display: flex;
  align-items: center;

  @media all and (max-width: 768px) {
    display: none;
  }
`;
export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
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
export const RegisterTutorBtnContainer = styled.div`
  box-sizing: border-box;
  padding: 5px 0;
  width: 50px;
  height: 50px;
`;
export const AlarmBtnContainer = styled.div`
  box-sizing: border-box;
  padding: 5px 0;
  width: 50px;
  height: 50px;
`;
export const AvatarBtnContainer = styled.div`
  box-sizing: border-box;
  padding: 5px 5px 5px 15px;
  width: 60px;
  height: 50px;
`;

export const AvatarBtnWholeBody = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
`;
export const BtnWholeBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 43px;
  height: 43px;
  border-radius: 100%;
  &:hover {
    background-color: #eee;
  }
`;
export const IconCover = styled.div`
  width: 40px;
  height: 40px;
  padding: 7.5px 0px 7.5px;
  margin-top: 3px;
`;

export const RightButton = styled.button`
  border-radius: 100%;
`;

export const AuthNavContainer = styled.div`
  position: absolute;
  top: 46px;
  right: -10px;
  width: 190px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  border-radius: 3px;
`;

export const AuthInfoSection = styled.section`
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 15px;
  padding-left: 10px;
`;

export const AuthAvatarContainer = styled.div`
  height: 40px;
`;
export const AuthProfileContainer = styled.div`
  height: 50px;
  & p:nth-child(1) {
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
  }
  & p:nth-child(2) {
    font-size: 14px;
  }
`;

export const AuthNavSection = styled.section`
  padding: 5px 0 10px;
`;

export const AuthNavItem = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 15px;
  & button {
    font-size: 15px;
    padding: 0;
    border: 0;
  }
  &:hover {
    background-color: #eee;
    cursor: pointer;
  }
  padding-left: 10px;
`;

export const PartitionLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #eaeaea;
`;

export const LoginSignUpDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 122px;
  height: 40px;
  border-radius: 20px;
  border: 2px solid ${colors.primary};

  &:hover {
    background-color: #fe902f16;
  }

  & > span {
    padding: 0 10px;
    font-size: 15px;
    color: ${colors.black};
  }
`;

export const MobileContainer = styled.div<{ $sideNavOpen: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #43434371;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 9999;
  visibility: ${(props) => (props.$sideNavOpen ? 'visible' : 'hidden')};
  transition: all 0.5s ease-in-out;
`;

export const MobileInner = styled.div<{ $sideNavOpen: boolean }>`
  width: 280px;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: ${colors.white};
  transform: translateX(-200px);
  transform: ${(props) => (props.$sideNavOpen ? ' translateX(0px)' : 'translateX(300px)')};
  transition: all 0.5s ease-in-out;
`;

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
    height: 35px;
    padding: 6px;
    img {
      height: 100%;
    }
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
export const NavModalCloseBtn = styled.button`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  float: right;
  margin-bottom: 15px;
  img {
    height: 100%;
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
