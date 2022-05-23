import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICovidData, IParamDate } from '../models/ICovid';

export const fetchCovid19Data = createAsyncThunk(
  'covid19/fetchCovidData',
  async (_, thunkAPI) => {
    const response = await axios.get<ICovidData[]>(
      'https://api.covid19api.com/summary',
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  },
);

export const fetchCovidDeathsAM = createAsyncThunk(
  'covid19AM/fetchDataByDate',
  async (data: IParamDate, thunkAPI) => {
    const { to, from } = data;
    const response = await axios.get<ICovidData[]>(
      `https://api.covid19api.com/country/armenia/status/deaths?from=${from}&to=${to}`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  },
);

export const fetchAllCoins = createAsyncThunk(
  'coins/fetchAll',
  async (_, thunkAPI) => {
    const response = await axios.get('https://api.coinranking.com/v2/coins', {

      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
);
