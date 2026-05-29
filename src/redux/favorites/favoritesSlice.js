import { createSlice } from "@reduxjs/toolkit";
import { FAVORITES_STORAGE_KEY } from "../../utils/constants";

const getInitialFavorites = () => {
  const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!savedFavorites) {
    return [];
  }

  try {
    const parsedFavorites = JSON.parse(savedFavorites);

    if (!Array.isArray(parsedFavorites)) {
      return [];
    }

    return parsedFavorites.filter(
      (favorite) =>
        favorite &&
        typeof favorite === "object" &&
        "id" in favorite,
    );
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
      const camper = action.payload;

      if (!state.items.some((favorite) => favorite.id === camper.id)) {
        state.items.push(camper);
        persistFavorites(state.items);
      }
    },
    removeFavorite(state, action) {
      const camperId =
        typeof action.payload === "object" ? action.payload.id : action.payload;

      state.items = state.items.filter((favorite) => favorite.id !== camperId);
      persistFavorites(state.items);
    },
    toggleFavorite(state, action) {
      const camper = action.payload;
      const camperId =
        typeof camper === "object" ? camper.id : camper;
      const isFavorite = state.items.some((favorite) => favorite.id === camperId);

      state.items = isFavorite
        ? state.items.filter((favorite) => favorite.id !== camperId)
        : typeof camper === "object"
          ? [...state.items, camper]
          : state.items;

      persistFavorites(state.items);
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
