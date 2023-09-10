import styled from 'styled-components';
import { colors } from '../../style/theme/colors';
import { Link } from 'react-router-dom';

export const Dashboard = styled.div`
  display: grid;
  grid-template-columns: 212px 60% 1fr;
  background-color: #eaeaea;
`;

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

export const DashboardItem = styled.div`
  background-color: ${colors.white};
  padding: 28px;
  border-radius: 20px;
  margin: 24px 20px;
`;

export const DashboardItemTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

export const dashboardFirstLayout = styled.section`
  border-right: 1px solid #d9d9d9;
`;

export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Avatar = styled.figure`
  width: 48px;
  height: 48px;
  background-color: #eaeaea;
  border-radius: 30px;
  overflow: hidden;
`;

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const UserName = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

export const DotState = styled.span`
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 10px;
  background-color: #fe902f;
  margin-right: 8px;
`;

export const IconMore = styled.img`
  margin-left: 4px;
`;

export const StateWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ButtonReportDetail = styled.button`
  font-size: 16px;
`;

export const IconTime = styled.img`
  margin-right: 4px;
`;

export const TutorList = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const DashboardTopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
`;

export const ButtonTime = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 14px;
  border: 1px solid #dcdcdc;
  border-radius: 30px;
  font-size: 14px;
`;

export const IconMoreWeek = styled.img`
  filter: invert(0%) sepia(1%) saturate(5%) hue-rotate(304deg) brightness(97%) contrast(103%);
  margin-left: 10px;
`;

export const IconMonth = styled.img`
  margin-left: 8px;
`;

export const ButtonTimeWrapper = styled.button`
  display: flex;
  align-items: center;
  font-size: 14px;
`;
