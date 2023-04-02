import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import dealSlice from "./features/dealSlice";
import globalSlice from "./features/globalSlice";
import stageSlice from "./features/stageSlice";
const store = configureStore({
  reducer: {
    deals: dealSlice,
    stages: stageSlice,
    global: globalSlice,
    auth: authSlice,
  },
});

export default store;
