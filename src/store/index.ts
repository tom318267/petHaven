import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";

// Add this interface definition
interface AuthState {
  user: {
    name: string;
    loyaltyPoints: number;
  } | null;
}

// Update or add this RootState interface
export interface RootState {
  auth: AuthState;
  // ... other slices ...
}

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
