import styled from '@emotion/styled';
import { Bar } from 'react-chartjs-2';
import { ReactElement } from 'react';
import { covidCountry as Country } from '../../store/models/ICovid';

interface Props {
  countries: Country[];
}
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
    },
  },
};

const ChartWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

type BarChartProps = {
  labels: string[],
  // some type from Chartjs.
  datasets: any[],
}

function BarChart({ countries }: Props): ReactElement {

  function generateChartData(): BarChartProps {
    const myData: number[] = [];
    const myLabels: string[] = [];

    countries.forEach((country):void => {
      myData.push(country.NewConfirmed);
      myLabels.push(country.Country);
    });

    return {
      labels: myLabels,
      datasets: [
        {
          label: 'New Confirmed',
          data: myData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  return (
    <ChartWrapper>
      <Bar data={generateChartData()} options={options} />
    </ChartWrapper>
  );
}

export default BarChart;
