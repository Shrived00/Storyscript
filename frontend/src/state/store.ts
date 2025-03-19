import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/userSlice";
import blogReducer from "./blog/blogSlice";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : null;

const preloadedState = {
  user: {
    userInfo: userInfoFromStorage,
    loading: false,
    error: null,
  },
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
