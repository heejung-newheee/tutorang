import { useQuery } from '@tanstack/react-query';
import { getMatchingCountMonth } from '../../../api/dashboard';
import ApexCharts from 'react-apexcharts';

type NewMemberChartProps = {
  year: number;
  month: number;
};

const MatchingChart = ({ year, month }: NewMemberChartProps) => {
  const matchingData = useQuery(['matchingData', year, month], () => getMatchingCountMonth(year, month), { enabled: !!year && !!month, refetchOnWindowFocus: false });

  if (!year || !month) return <div>날짜를 선택해주세요</div>;
  if (matchingData.isLoading) return <div>Loading...</div>;
  if (!matchingData.data) return <div>Not found</div>;
  return (
    <div>
      <ApexCharts
        options={{ chart: { height: 350, type: 'area' }, stroke: { curve: 'smooth' }, xaxis: { type: 'datetime', categories: matchingData.data.map((day) => day.date) } }}
        series={[{ name: '매칭 수', data: matchingData.data.map((day) => day.count) }]}
        type="area"
        height={350}
      ></ApexCharts>
    </div>
  );
};

export default MatchingChart;
