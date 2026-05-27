import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCamperById,
  getCampers,
  getFilteredCampers,
} from "../../services/api/campersApi";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (params = {}, thunkAPI) => {
    try {
      return await getCampers(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchFilteredCampers = createAsyncThunk(
  "campers/fetchFilteredCampers",
  async (filters = {}, thunkAPI) => {
    try {
      return await getFilteredCampers(filters);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchCamperDetails = createAsyncThunk(
  "campers/fetchCamperDetails",
  async (id, thunkAPI) => {
    try {
      return await getCamperById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
