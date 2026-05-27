import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  form: "",
  engine: "",
  transmission: "",
  kitchen: false,
  AC: false,
  bathroom: false,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocationFilter(state, action) {
      state.location = action.payload;
    },
    setFormFilter(state, action) {
      state.form = action.payload;
    },
    setEngineFilter(state, action) {
      state.engine = action.payload;
    },
    setTransmissionFilter(state, action) {
      state.transmission = action.payload;
    },
    toggleKitchenFilter(state) {
      state.kitchen = !state.kitchen;
    },
    toggleACFilter(state) {
      state.AC = !state.AC;
    },
    toggleBathroomFilter(state) {
      state.bathroom = !state.bathroom;
    },
    setFilters(state, action) {
      return { ...state, ...action.payload };
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  setLocationFilter,
  setFormFilter,
  setEngineFilter,
  setTransmissionFilter,
  toggleKitchenFilter,
  toggleACFilter,
  toggleBathroomFilter,
  setFilters,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
