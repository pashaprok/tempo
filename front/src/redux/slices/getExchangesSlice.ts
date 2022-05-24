import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ExchangeI } from '../../types/exchange.types';
import { RootState } from '../store';
import { getExchangesFromDB } from '../../services/getExchangesFromDB';
import { OrderType } from '../../types/order.types';

type ExchangesState = {
  isLoading: boolean;
  errorMessage: string | null;
  exchanges: ExchangeI[];
};

const initialState: ExchangesState = {
  isLoading: true,
  errorMessage: null,
  exchanges: [],
};

export const getExchanges = createAsyncThunk(
  'exchanges/getExchanges',
  async (order: OrderType) => {
    return await getExchangesFromDB(order);
  },
);

export const exchangesSlice = createSlice({
  name: 'exchanges',
  initialState,
  reducers: {
    loading: () => {
      return { isLoading: true, errorMessage: null, exchanges: [] };
    },
    fail: (state, action) => {
      return { ...state, isLoading: false, errorMessage: action.payload };
    },
    get: (state, action) => {
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        exchanges: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExchanges.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExchanges.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exchanges = action.payload;
      })
      .addCase(getExchanges.rejected, (state) => {
        state.isLoading = false;
        state.errorMessage = `Loading failed!`;
      });
  },
});

export const { loading, get, fail } = exchangesSlice.actions;

export const exchangesList = (state: RootState) => state.exchanges.exchanges;

export const exchangesReducer = exchangesSlice.reducer;
