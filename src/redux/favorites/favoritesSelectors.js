export const selectFavorites = (state) => state.favorites.items;
export const selectIsFavorite = (camperId) => (state) =>
  state.favorites.items.includes(camperId);
