import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a serializable user object interface
interface SerializableUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: SerializableUser | null; // Store only serializable user data
  loading: boolean;
  error: string | null;
  loginMessage: string | null;
  message: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  loginMessage: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // This now stores only serializable user properties
    setUser: (state, action: PayloadAction<SerializableUser | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoginMessage: (state, action: PayloadAction<string | null>) => {
      state.loginMessage = action.payload;
    },
    setMessage: (state, action: PayloadAction<string | null>) => {
      state.message = action.payload;
    },
  },
});

export const { setUser, setLoading, setError, setLoginMessage, setMessage } =
  authSlice.actions;
export default authSlice.reducer;
export type { AuthState };
