import { createSlice } from "@reduxjs/toolkit";
import { CAMPERS_PER_PAGE, INITIAL_PAGE } from "../../utils/constants";
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
  page: INITIAL_PAGE,
  limit: CAMPERS_PER_PAGE,
  hasMore: true,
  total: 0,
  activeQuery: {},
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
      state.page = INITIAL_PAGE;
      state.hasMore = true;
      state.total = 0;
    },
    setActiveQuery(state, action) {
      state.activeQuery = action.payload;
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
        state.total = action.payload.total;
        const requestedPage = action.meta.arg?.page ?? INITIAL_PAGE;

        if (requestedPage > INITIAL_PAGE) {
          state.items.push(...action.payload.items);
        } else {
          state.items = action.payload.items;
        }

        state.hasMore = state.items.length < action.payload.total;
      })
      .addCase(fetchCampers.rejected, handleRejected)
      .addCase(fetchFilteredCampers.pending, handlePending)
      .addCase(fetchFilteredCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.total = action.payload.total;
        const requestedPage = action.meta.arg?.page ?? INITIAL_PAGE;

        if (requestedPage > INITIAL_PAGE) {
          state.items.push(...action.payload.items);
        } else {
          state.items = action.payload.items;
        }

        state.hasMore = state.items.length < action.payload.total;
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

export const {
  clearCampers,
  setActiveQuery,
  setPage,
  incrementPage,
  clearSelectedCamper,
} = campersSlice.actions;

export default campersSlice.reducer;
