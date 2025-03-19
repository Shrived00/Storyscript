import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSice";
import userReducer from "./auth/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
