import { icon_month, icon_more_dashboard, icon_time_dashboard } from '../../../assets';
import { TutorApply } from '../../../components/dashboard/modules';
import * as S from './Dashboard.styled';

const Dashboard = () => {
  return (
    <div>
      <S.dashboardFirstLayout>
        <S.DashboardItem>
          <S.DashboardTopWrapper>
            <S.DashboardItemTitle>신규 가입자 현황</S.DashboardItemTitle>
            <S.ButtonTimeWrapper>
              2023.9.7 <S.IconMonth src={icon_month} />
            </S.ButtonTimeWrapper>
          </S.DashboardTopWrapper>
          <div id="chart"></div>
        </S.DashboardItem>
        <S.DashboardItem>
          <S.DashboardTopWrapper>
            <S.DashboardItemTitle>튜터 신고 현황</S.DashboardItemTitle>
            <S.ButtonTime>
              Week <S.IconMoreWeek src={icon_more_dashboard} />
            </S.ButtonTime>
          </S.DashboardTopWrapper>
          <ul>
            <S.TutorList>
              <S.UserWrapper>
                <S.Avatar>
                  <S.AvatarImg src="" />
                </S.Avatar>
                <S.UserName>김선익</S.UserName>
              </S.UserWrapper>

              <S.ButtonReportDetail>신고내역</S.ButtonReportDetail>

              <S.StateWrapper>
                <S.DotState />
                확인중
                <S.IconMore src={icon_more_dashboard} />
              </S.StateWrapper>

              <S.TimeWrapper>
                <S.IconTime src={icon_time_dashboard} />
                4시간 전
              </S.TimeWrapper>
            </S.TutorList>
            <S.TutorList>
              <S.UserWrapper>
                <S.Avatar>
                  <S.AvatarImg src="" />
                </S.Avatar>
                <S.UserName>김선익</S.UserName>
              </S.UserWrapper>

              <S.ButtonReportDetail>신고내역</S.ButtonReportDetail>

              <S.StateWrapper>
                <S.DotState />
                확인중
                <S.IconMore src={icon_more_dashboard} />
              </S.StateWrapper>

              <S.TimeWrapper>
                <S.IconTime src={icon_time_dashboard} />
                4시간 전
              </S.TimeWrapper>
            </S.TutorList>
            <S.TutorList>
              <S.UserWrapper>
                <S.Avatar>
                  <S.AvatarImg src="" />
                </S.Avatar>
                <S.UserName>김선익</S.UserName>
              </S.UserWrapper>

              <S.ButtonReportDetail>신고내역</S.ButtonReportDetail>

              <S.StateWrapper>
                <S.DotState />
                확인중
                <S.IconMore src={icon_more_dashboard} />
              </S.StateWrapper>

              <S.TimeWrapper>
                <S.IconTime src={icon_time_dashboard} />
                4시간 전
              </S.TimeWrapper>
            </S.TutorList>
            <S.TutorList>
              <S.UserWrapper>
                <S.Avatar>
                  <S.AvatarImg src="" />
                </S.Avatar>
                <S.UserName>김선익</S.UserName>
              </S.UserWrapper>

              <S.ButtonReportDetail>신고내역</S.ButtonReportDetail>

              <S.StateWrapper>
                <S.DotState />
                확인중
                <S.IconMore src={icon_more_dashboard} />
              </S.StateWrapper>

              <S.TimeWrapper>
                <S.IconTime src={icon_time_dashboard} />
                4시간 전
              </S.TimeWrapper>
            </S.TutorList>
          </ul>
        </S.DashboardItem>
        <S.DashboardItem>
          <S.DashboardItemTitle>월별 매칭 수</S.DashboardItemTitle>
        </S.DashboardItem>
      </S.dashboardFirstLayout>
      <section>
        <TutorApply />
      </section>
    </div>
  );
};

export default Dashboard;
