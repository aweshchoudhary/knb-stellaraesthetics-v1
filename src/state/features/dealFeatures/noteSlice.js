import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../config/axiosInstance";

const initialState = {
  data: [],
  loading: false,
  success: false,
  error: null,
};
// API CALLS
export const addNote = createAsyncThunk("addNote", async (data) => {
  try {
    await axiosInstance.post("/api/card/add-note", data);
    return "Note has been added";
  } catch (err) {
    console.log(err);
    return err.message;
  }
});
export const updateNote = createAsyncThunk("updateNote", async (data) => {
  try {
    await axiosInstance.put("/api/card/update-note", data);
    return "Note has been updated";
  } catch (err) {
    console.log(err);
    return err.message;
  }
});
export const deleteNote = createAsyncThunk("deleteNote", async (data) => {
  try {
    await axiosInstance.delete("/api/card/delete-note", {
      params: {
        cardId: data.cardId,
        noteId: data.noteId,
      },
    });
    return "Note has been deleted";
  } catch (err) {
    console.log(err);
    return err.message;
  }
});

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNote.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(addNote.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(addNote.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    // GET DEAL
    builder.addCase(updateNote.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(updateNote.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(updateNote.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });

    // GET DEAL
    builder.addCase(deleteNote.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(deleteNote.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(deleteNote.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  },
});

export default noteSlice.reducer;
