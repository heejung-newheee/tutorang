import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../../style/theme/colors';

export const SideBar = styled.section`
  position: relative;
  width: 212px;
  height: 100vh;
  border-right: 1px solid ${colors.gray_300};
  background-color: ${colors.white};
`;

export const ButtonHome = styled(Link)`
  display: inline-block;
  margin: 32px 0 48px 34px;
`;

export const IconHome = styled.img`
  display: inline-block;
  width: 20px;
  height: 20px;
`;

export const NavList = styled.ul``;

export const NavItem = styled.li`
  font-size: 18px;
  font-weight: 400;
  color: #949494;
  padding: 12px 0 12px 34px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.gray_100};
  }
`;

export const ButtonLogout = styled.button`
  position: absolute;
  display: flex;
  bottom: 34px;
  left: 34px;
  font-size: 15px;
  font-weight: 400;
  color: #949494;

  &:hover {
    color: #000;

    & img {
      filter: invert(0%) sepia(100%) saturate(29%) hue-rotate(133deg) brightness(93%) contrast(107%);
    }
  }
`;

export const IconLogout = styled.img`
  filter: invert(61%) sepia(14%) saturate(0%) hue-rotate(239deg) brightness(95%) contrast(83%);
  margin-right: 4px;
`;
