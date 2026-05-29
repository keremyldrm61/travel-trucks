import { createSelector } from "@reduxjs/toolkit";

export const selectFavorites = (state) => state.favorites.items;
export const selectFavoriteIds = createSelector([selectFavorites], (favorites) =>
  favorites.map((favorite) => favorite.id),
);
export const selectIsFavorite = (camperId) => (state) =>
  state.favorites.items.some((favorite) => favorite.id === camperId);
