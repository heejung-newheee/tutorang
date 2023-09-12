import ApexCharts from 'apexcharts';
import { icon_month, icon_more_dashboard, icon_time_dashboard } from '../../../assets';
import { TutorApply, TutorReport } from '../../../components/dashboard/modules';
import * as S from './Dashboard.styled';

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
        <TutorReport />
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
