import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";

// const olddata =[
//   {
//     id: "stage-1",
//     name: "requested",
//     deals: 0,
//     amount: 0,
//   },
//   {
//     id: "stage-2",
//     name: "to do",
//     deals: 0,
//     amount: 0,
//   },
//   {
//     id: "stage-3",
//     name: "in progress",
//     deals: 0,
//     amount: 0,
//   },
//   {
//     id: "stage-4",
//     name: "done",
//     deals: 0,
//     amount: 0,
//   },
// ];

const initialState = {
  data: [],
  loading: false,
  success: false,
  error: null,
};

export const getAllStages = createAsyncThunk("getAllStages", async () => {
  try {
    const res = await axiosInstance.get("/api/get-all-stages");
    return res.data.data;
  } catch (err) {
    return err.message;
  }
});
export const createStage = createAsyncThunk("createStage", async (data) => {
  try {
    await axiosInstance.post("/api/stage", data);
    return "Stage Created";
  } catch (err) {
    return err.message;
  }
});
export const deleteStage = createAsyncThunk("deleteStage", async (data) => {
  try {
    await axiosInstance.delete("/api/stage", {
      params: {
        id: data,
      },
    });
    return "Stage Deleted";
  } catch (err) {
    return err.message;
  }
});

const stageSlice = createSlice({
  name: "stage",
  initialState,
  reducers: {
    addTempItemToStage(state, { payload }) {
      state.data.forEach((stage) => {
        if (stage._id === payload.stageId) {
          stage.items.push(payload.item);
        }
      });
    },
    removeTempItemFromStage(state, { payload }) {
      state.data.forEach((stage) => {
        if (stage._id === payload.stageId) {
          stage.items.splice(payload.itemPosition, 1);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllStages.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(getAllStages.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getAllStages.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    //CREATE STAGE FUNCTIONS
    builder.addCase(createStage.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(createStage.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(createStage.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    //DELETED STAGE FUNCTIONS
    builder.addCase(deleteStage.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(deleteStage.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(deleteStage.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});

export const { addTempItemToStage, removeTempItemFromStage } =
  stageSlice.actions;
export default stageSlice.reducer;
