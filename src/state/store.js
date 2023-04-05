import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import globalSlice from "./features/globalSlice";
import stageSlice from "./features/stageSlice";
import dealSlice from "./features/dealFeatures/dealSlice";
import noteSlice from "./features/dealFeatures/noteSlice";
import activitySlice from "./features/dealFeatures/activitySlice";
const store = configureStore({
  reducer: {
    deals: dealSlice,
    note: noteSlice,
    activity: activitySlice,
    stages: stageSlice,
    global: globalSlice,
    auth: authSlice,
  },
});

export default store;
