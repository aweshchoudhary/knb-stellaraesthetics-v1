import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axiosInstance";

const initialState = {
  data: [],
  loading: false,
  success: false,
  error: null,
};
// API CALLS
export const addActivity = createAsyncThunk("addActivity", async (data) => {
  try {
    await axiosInstance.post("/api/card/add-activity", data);
    return "Activity has been added";
  } catch (err) {
    console.log(err);
    return err.message;
  }
});
export const updateActivity = createAsyncThunk(
  "updateActivity",
  async (data) => {
    try {
      await axiosInstance.put("/api/card/update-activity", data);
      return "Activity has been updated";
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
);
export const deleteActivity = createAsyncThunk(
  "deleteActivity",
  async (cardId, noteId) => {
    try {
      await axiosInstance.delete("/api/card/delete-activity", {
        params: {
          cardId,
          noteId,
        },
      });
      return "Activity has been deleted";
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
);

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET DEAL
    builder.addCase(addActivity.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(addActivity.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(addActivity.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    // GET DEAL
    builder.addCase(updateActivity.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(updateActivity.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(updateActivity.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    // GET DEAL
    builder.addCase(deleteActivity.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(deleteActivity.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(deleteActivity.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  },
});

export default activitySlice.reducer;
