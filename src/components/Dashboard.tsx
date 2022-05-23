import React, { ReactElement, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LeftSideBar from './Layouts/LeftSideBar';

function Dashboard(): ReactElement {
  const navigate = useNavigate();

  const goToChart = (path: string):void => {
    navigate(path);
  };

  return (
    <LeftSideBar>
      <h2>Charts</h2>
      <div className="charts__wrapper">
        <button type="button" className="chart__item chart__bar" onClick={() => goToChart('/table')}>
          <img src="/images/icons/barChart.svg" alt="Bar" />
        </button>
        <button type="button" className="chart__item chart__pie" onClick={() => goToChart('/pie')}>
          <img src="/images/icons/pieChart.svg" alt="Pie Chart" />
        </button>
        <button type="button" className="chart__item chart__line" onClick={() => goToChart('/line')}>
          <img src="/images/icons/lineChart.svg" alt="Line Chart" />
        </button>
      </div>
    </LeftSideBar>
  );
}
export default Dashboard;
