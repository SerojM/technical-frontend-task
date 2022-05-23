import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import LeftSideBar from '../Layouts/LeftSideBar';
import { fetchCovidDeathsAM } from '../../store/reducers/ActionsCreators';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Armenia Covid19 Deaths',
    },
  },
};

type BarChartProps = {
  labels: string[],
  datasets: any[],
}

export default function LineChart(): ReactElement {
  const dispatch = useAppDispatch();
  const date = new Date();
  const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
  const { deathsByCountry } = useAppSelector((state) => state.dashboardReducer);
  const [startDate, setStartDate] = useState<Date | null | undefined>(new Date(year, month, day - 10));
  const [endDate, setEndDate] = useState<Date | null | undefined>(new Date(year, month, day - 1));
  const navigate = useNavigate();

  useEffect(() => {
    const param = {
      from: startDate,
      to: endDate,
    };
    dispatch(fetchCovidDeathsAM(param));
  }, []);

  function generateChartData(): BarChartProps {
    const myData: number[] = [];
    const myLabels: string[] = [];

    deathsByCountry?.forEach((item): void => {
      myData.push(item.Cases);
      myLabels.push(moment(item.Date)
        .format('DD-MM'));
    });

    return {
      labels: myLabels,
      datasets: [
        {
          label: 'Deaths',
          data: myData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderWidth: 1,
        },
      ],
    };
  }

  const onChangeDate = async (val: any) => {
    const [start, end] = val;

    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      const param = {
        from: start,
        to: end,
      };
      await dispatch(fetchCovidDeathsAM(param));
      generateChartData();
    }
  };
  const backHandle = ():void => {
    navigate('/');
  };
  return (
    <LeftSideBar>
      <button className="back__button" type="button" onClick={() => backHandle()}>
        Back
      </button>
      <div>
        <DatePicker
          selected={startDate}
          onChange={(val) => onChangeDate(val)}
          startDate={startDate}
          endDate={endDate}
          maxDate={new Date(year, month, day - 1)}
          selectsRange
          inline
        />
        <Line options={options} data={generateChartData()} />
      </div>
    </LeftSideBar>
  );
}
