import { useState } from 'react';
import { getYearAndMonth } from '../../../utils/Date';
import TutorApply from '../tutorApply/TutorApply';
import TutorReport from '../tutorReport/TutorReport';
import * as S from './Dashboard.styled';
import MatchingChart from './MatchingChart';
import NewMemberChart from './NewMemberChart';

const Dashboard = () => {
  const [chartMonth, setChartMonth] = useState(getYearAndMonth());
  const [matchingChartMonth, setMatchingChartMonth] = useState(getYearAndMonth());

  return (
    <div>
      <S.dashboardFirstLayout>
        <S.DashboardItem>
          <S.DashboardTopWrapper>
            <S.DashboardItemTitle>신규 가입자 현황</S.DashboardItemTitle>
            <label htmlFor="yearMonth" className="sr-only">
              년도와 월 선택:
            </label>
            <input type="month" id="yearMonth" name="yearMonth" value={chartMonth} onChange={(e) => setChartMonth(e.target.value)}></input>
          </S.DashboardTopWrapper>
          <NewMemberChart year={Number(chartMonth.slice(0, 4))} month={Number(chartMonth.slice(5))} />
        </S.DashboardItem>
        <TutorReport />
        <S.DashboardItem>
          <S.DashboardItemTitle>월별 매칭 수</S.DashboardItemTitle>
          <label htmlFor="matchingYearMonth" className="sr-only">
            년도와 월 선택:
          </label>
          <input type="month" id="matchingYearMonth" name="matchingYearMonth" value={matchingChartMonth} onChange={(e) => setMatchingChartMonth(e.target.value)}></input>
          <MatchingChart year={Number(matchingChartMonth.slice(0, 4))} month={Number(matchingChartMonth.slice(5))} />
        </S.DashboardItem>
      </S.dashboardFirstLayout>
      <section>
        <TutorApply />
      </section>
    </div>
  );
};

export default Dashboard;
