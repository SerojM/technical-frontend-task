import React, { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import LeftSideBar from '../Layouts/LeftSideBar';
import { fetchCovid19Data } from '../../store/reducers/ActionsCreators';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'T',
    },
  },
};

type BarChartProps = {
  labels: string[],
  datasets: any[],
}

export default function PieChart(): ReactElement {
  const dispatch = useAppDispatch();
  const { covidSummary } = useAppSelector((state) => state.dashboardReducer);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCovid19Data());
  }, []);

  function generateChartData(): BarChartProps {
    const myData: number[] = [];
    const myLabels: string[] = [];

    covidSummary?.Countries.slice(0, 50).forEach((country): void => {
      if (country?.NewConfirmed > 0) {
        myData.push(country.NewConfirmed);
        myLabels.push(country.Country);
      }
    });

    return {
      labels: myLabels,
      datasets: [
        {
          label: 'Deaths',
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
  const backHandle = ():void => {
    navigate('/');
  };
  return (
    <LeftSideBar>
      <button className="back__button" type="button" onClick={() => backHandle()}>
        Back
      </button>
      <div className="pie__wrapper">
        <h3>Total Confirmed</h3>
        <Pie data={generateChartData()} />
      </div>
    </LeftSideBar>
  );
}
