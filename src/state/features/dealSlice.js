import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
  data: [],
  loading: false,
  success: false,
  error: null,
};

export const getDealsByStage = createAsyncThunk("getDealsByStage", async () => {
  try {
    const res = await axiosInstance.get("/api/get-all-kanbans");
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err.message;
  }
});
export const createDeal = createAsyncThunk("createDeal", async (data) => {
  try {
    const res = await axiosInstance.post("/api/card", data);
    return res.data.data;
  } catch (err) {
    console.log(err);
    return err.message;
  }
});
export const updateDealStage = createAsyncThunk(
  "updateDealStage",
  async (data) => {
    try {
      await axiosInstance.put("/api/update-card-stage", data);
      return "Deal stage has updated";
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
);

const dealSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    addDeal: (state, action) => {
      state.data.push(action.payload);
    },
    deleteDeal: (state, action) => {
      const data = state.data.filter((item) => action.payload !== item.id);
      state.data = [...data];
    },
    setStage: (state, action) => {
      state.data.forEach((item) => {
        if (item.id === action.payload.id) {
          item.stage = action.payload.stage;
        }
      });
    },
    reorderDeals: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDealsByStage.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(getDealsByStage.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(getDealsByStage.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    // CREATE DEAL
    builder.addCase(createDeal.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(createDeal.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(createDeal.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    // UPDATE DEAL STAGE
    builder.addCase(updateDealStage.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(updateDealStage.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(updateDealStage.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});

export const {} = dealSlice.actions;
export default dealSlice.reducer;
