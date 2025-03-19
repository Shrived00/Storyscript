import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://default-api.com";

// Define the User state
interface UserState {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
}

// Define the UserInfo type
interface UserInfo {
  _id: string;
  name: string;
  email: string;
  token: string;
}

// Initial state
const initialState: UserState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,
  loading: false,
  error: null,
};

/**
 * Async thunk for user login
 */
export const loginUser = createAsyncThunk<
  UserInfo,
  { email: string; password: string },
  { rejectValue: string }
>("user/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post<UserInfo>(
      `${API_BASE_URL}/api/users/login`,
      { email, password },
      config,
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

/**
 * Async thunk for user registration
 */
export const registerUser = createAsyncThunk<
  UserInfo,
  { name: string; email: string; password: string },
  { rejectValue: string }
>("user/register", async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post<UserInfo>(
      `${API_BASE_URL}/api/users/register`,
      { name, email, password },
      config,
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Registration failed",
    );
  }
});

/**
 * User Slice (Reducer + Actions)
 */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userInfo");
      state.userInfo = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<UserInfo>) => {
          state.loading = false;
          state.userInfo = action.payload;
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // Register Cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<UserInfo>) => {
          state.loading = false;
          state.userInfo = action.payload;
        },
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
