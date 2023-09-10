import { icon_home, icon_logout, icon_month, icon_more_dashboard, icon_time_dashboard } from '../../assets';
import * as S from './Dashboard.styled';
import ApexCharts from 'apexcharts';
import { TutorApply } from './modules';

const Dashboard = () => {
  var options = {
    series: [
      {
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: 'series2',
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    chart: {
      height: 350,
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      categories: ['2018-09-19T00:00:00.000Z', '2018-09-19T01:30:00.000Z', '2018-09-19T02:30:00.000Z', '2018-09-19T03:30:00.000Z', '2018-09-19T04:30:00.000Z', '2018-09-19T05:30:00.000Z', '2018-09-19T06:30:00.000Z'],
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  };

  var chart = new ApexCharts(document.querySelector('#chart'), options);
  chart.render();

  return (
    <>
      <S.Dashboard>
        <S.SideBar>
          <nav>
            <S.ButtonHome to="/">
              <S.IconHome src={icon_home} />
            </S.ButtonHome>
            <S.NavList>
              <S.NavItem>대시보드</S.NavItem>
              <S.NavItem>사용자관리</S.NavItem>
              <S.NavItem>게시판</S.NavItem>
              <S.NavItem>환불취소관리</S.NavItem>
            </S.NavList>
          </nav>
          <S.ButtonLogout>
            <S.IconLogout src={icon_logout} />
            로그아웃
          </S.ButtonLogout>
        </S.SideBar>
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
      </S.Dashboard>
    </>
  );
};

export default Dashboard;
