import React, { ReactElement, useEffect, useState } from 'react';
import { Global, css } from '@emotion/react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCovid19Data } from '../../store/reducers/ActionsCreators';
import { covidCountry as Country } from '../../store/models/ICovid';
import GlobalInfo from './GlobalInfo';
import CountryList from './CountryList';
import BarChart from './BarChart';
import LeftSideBar from '../Layouts/LeftSideBar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
      text: 'Chart.js Bar Chart',
    },
  },
};


export default function TableChart(): ReactElement {
  const [activeCountries, setActiveCountries] = useState<Country[]>([]);
  const dispatch = useAppDispatch();
  const covidSummary = useAppSelector((state) => state.dashboardReducer.covidSummary);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCovid19Data());
  }, []);

  const onCountryClick = (country: Country) => {
    const countryIndex = activeCountries.findIndex(
      (activeCountry) => activeCountry.ID === country.ID,
    );

    if (countryIndex > -1) {
      const newActiveCountries = [...activeCountries];
      newActiveCountries.splice(countryIndex, 1);

      setActiveCountries(newActiveCountries);
    } else {
      setActiveCountries([...activeCountries, country]);
    }
  };
  const backHandle = ():void => {
    navigate('/');
  };
  return (
    <LeftSideBar>
      <div>
        <button className="back__button" type="button" onClick={() => backHandle()}>
          Back
        </button>
        <Global
          styles={css`
          body {
            background-color: #f1f1f1;
            color: #7d7d7d;
          }
        `}
        />
        {covidSummary ? (
          <>
            <GlobalInfo
              newConfirmed={covidSummary?.Global.NewConfirmed}
              newDeaths={covidSummary?.Global.NewDeaths}
              newRecovered={covidSummary?.Global.NewRecovered}
            />
            <hr />
            {activeCountries.length ? (
              <BarChart countries={activeCountries} />
            ) : null}

            <CountryList
              countries={covidSummary?.Countries}
              onItemClick={onCountryClick}
            />
          </>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </LeftSideBar>
  );
}
