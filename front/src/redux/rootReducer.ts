import { exchangesReducer } from './slices/getExchangesSlice';

const rootReducer = {
  exchanges: exchangesReducer,
};
export default rootReducer;
