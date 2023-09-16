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

export const StateWrapper = styled.button`
  display: flex;
  align-items: center;
`;

export const TimeWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

export const ButtonReportDetail = styled.button`
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: 16px;
`;

export const IconTime = styled.img`
  margin-right: 4px;
`;

export const TutorList = styled.li`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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

export const PendingDotState = styled(DotState)`
  background-color: orange;
`;

export const SuccessDotState = styled(DotState)`
  background-color: green;
`;

export const RejectDotState = styled(DotState)`
  background-color: red;
`;

export const StateMenuWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: end;
`;

export const moreMenu = styled.ul`
  display: none;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray_200};
  border-radius: 8px;
  overflow: hidden;
  margin-top: 40px;

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
