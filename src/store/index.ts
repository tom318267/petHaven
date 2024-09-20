import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";

// Add this interface definition
interface AuthState {
  user: {
    name: string;
    loyaltyPoints: number;
  } | null;
}

// Update this RootState interface
export interface RootState {
  auth: AuthState;
  cart: ReturnType<typeof cartReducer>;
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type { CartItem } from "./cartSlice";
