import { useQuery } from '@tanstack/react-query';
import ApexCharts from 'react-apexcharts';
import { getConvertedTutorCountMonth, getNewUserCountMonth } from '../../../api/dashboard';

type NewMemberChartProps = {
  year: number;
  month: number;
};

const NewMemberChart = ({ year, month }: NewMemberChartProps) => {
  console.log(year, month);
  const newMemberData = useQuery(['newMemberData', year, month], () => getNewUserCountMonth(year, month), { enabled: !!year && !!month, refetchOnWindowFocus: false });
  const tutorData = useQuery(['convertedTutorData', year, month], () => getConvertedTutorCountMonth(year, month), { enabled: !!year && !!month, refetchOnWindowFocus: false });

  if (!year || !month) return <div>날짜를 선택해주세요</div>;
  if (newMemberData.isLoading || tutorData.isLoading) return <div>Loading...</div>;
  if (!newMemberData.data || !tutorData.data) return <div>Not found</div>;
  console.log(newMemberData.data, tutorData.data);
  return (
    <div>
      <ApexCharts
        options={{ chart: { height: 350, type: 'area' }, stroke: { curve: 'smooth' }, xaxis: { type: 'datetime', categories: newMemberData.data.map((day) => day.date) } }}
        series={[
          { name: '신규 가입 수', data: newMemberData.data.map((day) => day.count) },
          { name: '튜터 전환 수', data: tutorData.data.map((day) => day.count) },
        ]}
        type="area"
        height={350}
      ></ApexCharts>
    </div>
  );
};

export default NewMemberChart;
