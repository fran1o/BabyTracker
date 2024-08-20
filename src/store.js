import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice";
import eventReducer from "./slices/eventSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
    categories: categoriesReducer,
  },
});

export default store;
