export const selectCampers = (state) => state.campers.items;
export const selectSelectedCamper = (state) => state.campers.selectedCamper;
export const selectCampersLoading = (state) => state.campers.isLoading;
export const selectCampersError = (state) => state.campers.error;
export const selectCampersPage = (state) => state.campers.page;
export const selectCampersLimit = (state) => state.campers.limit;
export const selectHasMoreCampers = (state) => state.campers.hasMore;
