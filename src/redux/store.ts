import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import walletsReducer from './walletsSlice';
import popUpReduser from './popUpSlice';

export const store = configureStore({
  reducer: {
    // products: ProductsSlice.reducer,
    // teamMembers: TeamSlice.reducer,
    // cart: CartSlice.reducer,
    auth: authReducer,
    wallets: walletsReducer,
    popup: popUpReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
