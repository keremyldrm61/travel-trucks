import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCamperDetails,
  fetchCampers,
  fetchFilteredCampers,
} from "./campersOperations";

const initialState = {
  items: [],
  selectedCamper: null,
  isLoading: false,
  error: null,
  page: 1,
  limit: 4,
  hasMore: true,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload ?? action.error.message;
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    clearCampers(state) {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    incrementPage(state) {
      state.page += 1;
    },
    clearSelectedCamper(state) {
      state.selectedCamper = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, handlePending)
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        if (state.page > 1) {
          state.items.push(...action.payload);
        } else {
          state.items = action.payload;
        }

        state.hasMore = action.payload.length === state.limit;
      })
      .addCase(fetchCampers.rejected, handleRejected)
      .addCase(fetchFilteredCampers.pending, handlePending)
      .addCase(fetchFilteredCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
        state.page = 1;
        state.hasMore = action.payload.length === state.limit;
      })
      .addCase(fetchFilteredCampers.rejected, handleRejected)
      .addCase(fetchCamperDetails.pending, handlePending)
      .addCase(fetchCamperDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.selectedCamper = action.payload;
      })
      .addCase(fetchCamperDetails.rejected, handleRejected);
  },
});

export const { clearCampers, setPage, incrementPage, clearSelectedCamper } =
  campersSlice.actions;

export default campersSlice.reducer;
