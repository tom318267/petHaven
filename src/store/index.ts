import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

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
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
