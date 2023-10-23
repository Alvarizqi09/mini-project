import { configureStore } from '@reduxjs/toolkit';
import watchlistReducer from './reducers/watchlistSlice';

const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
  },
});

export default store;
