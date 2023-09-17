import styled from 'styled-components';
import { colors } from '../../../style/theme/colors';

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

export const DashboardTopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
`;

export const ButtonTimeWrapper = styled.button`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

export const IconMonth = styled.img`
  margin-left: 8px;
`;

export const TutorList = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const UserWrapper = styled.button`
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

export const IconTime = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
  margin-top: 4px;
`;

export const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const IconMore = styled.img`
  margin-left: 4px;
`;

export const StateWrapper = styled.button`
  display: flex;
  align-items: center;
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

export const PendingDotState = styled(DotState)`
  background-color: orange;
`;

export const SuccessDotState = styled(DotState)`
  background-color: green;
`;

export const RejectDotState = styled(DotState)`
  background-color: red;
`;

export const moreMenu = styled.ul`
  display: none;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray_200};
  border-radius: 8px;
  overflow: hidden;
  margin-top: 8px;

  &.active {
    display: inline-block;
    position: absolute;
    right: 0;
    background: #fff;
    z-index: 9;
    box-shadow: 0 12px 12px rgba(0, 0, 0, 0.05);
  }
`;

export const moreMenuItem = styled.li`
  padding: 8px 32px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.gray_100};
  }
`;
