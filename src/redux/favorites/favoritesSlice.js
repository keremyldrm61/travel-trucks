import { createSlice } from "@reduxjs/toolkit";
import { FAVORITES_STORAGE_KEY } from "../../utils/constants";

const getInitialFavorites = () => {
  const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!savedFavorites) {
    return [];
  }

  try {
    return JSON.parse(savedFavorites);
  } catch {
    return [];
  }
};

const persistFavorites = (favorites) => {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: getInitialFavorites(),
  },
  reducers: {
    addFavorite(state, action) {
      const camperId = action.payload;

      if (!state.items.includes(camperId)) {
        state.items.push(camperId);
        persistFavorites(state.items);
      }
    },
    removeFavorite(state, action) {
      state.items = state.items.filter((id) => id !== action.payload);
      persistFavorites(state.items);
    },
    toggleFavorite(state, action) {
      const camperId = action.payload;
      const isFavorite = state.items.includes(camperId);

      state.items = isFavorite
        ? state.items.filter((id) => id !== camperId)
        : [...state.items, camperId];

      persistFavorites(state.items);
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
