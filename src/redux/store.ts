import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // products: ProductsSlice.reducer,
    // teamMembers: TeamSlice.reducer,
    // cart: CartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
