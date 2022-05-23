import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCovid19Data, fetchCovidDeathsAM, fetchAllCoins } from './ActionsCreators';
import { ICovidData, ICovidAM } from '../models/ICovid';

interface DashboardState {
  isLoading: boolean;
  error: string;
  count: number;
  covidSummaryError: string;
  covidSummary: ICovidData | undefined;
  deathsByCountry: ICovidAM[] | undefined;
}

const initialState: DashboardState = {
  isLoading: false,
  error: '',
  count: 0,
  covidSummaryError: '',
  covidSummary: undefined,
  deathsByCountry: undefined,
};

export const dashboardSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment(state, action: PayloadAction<number>) {
      state.count += action.payload;
    },
  },
  extraReducers: {
    [fetchCovid19Data.pending.type]: (state) => {
      state.isLoading = false;
    },
    [fetchCovid19Data.fulfilled.type]: (state, action: PayloadAction<ICovidData | undefined>) => {
      state.isLoading = false;
      state.error = '';
      state.covidSummary = action.payload;
    },
    [fetchCovid19Data.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.covidSummaryError = action.payload;
    },
    [fetchCovidDeathsAM.pending.type]: (state) => {
      state.isLoading = false;
    },
    [fetchCovidDeathsAM.fulfilled.type]: (state, action: PayloadAction<ICovidAM[] | undefined>) => {
      state.isLoading = false;
      state.error = '';
      state.deathsByCountry = action.payload;
    },
    [fetchCovidDeathsAM.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.covidSummaryError = action.payload;
    },
    [fetchAllCoins.pending.type]: (state) => {
      state.isLoading = false;
    },
    // [fetchAllCoins.fulfilled.type]: (state, action: PayloadAction<ICovidAM[] | undefined>) => {
    //   state.isLoading = false;
    //   state.error = '';
    //   state.fetchAllCoins = action.payload;
    // },
    [fetchAllCoins.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.covidSummaryError = action.payload;
    },
  },
});

export default dashboardSlice.reducer;
