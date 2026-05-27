import { axiosInstance } from "../../utils/axiosInstance";

const buildCampersQueryParams = (filters = {}) => {
  const params = {};

  if (filters.location) {
    params.location = filters.location;
  }

  if (filters.form) {
    params.form = filters.form;
  }

  if (filters.transmission) {
    params.transmission = filters.transmission;
  }

  if (filters.kitchen) {
    params.kitchen = filters.kitchen;
  }

  if (filters.AC) {
    params.AC = filters.AC;
  }

  if (filters.bathroom) {
    params.bathroom = filters.bathroom;
  }

  if (filters.page) {
    params.page = filters.page;
  }

  if (filters.limit) {
    params.limit = filters.limit;
  }

  return params;
};

export const getCampers = async (params = {}) => {
  const response = await axiosInstance.get("/campers", {
    params: buildCampersQueryParams(params),
  });

  return response.data;
};

export const getCamperById = async (id) => {
  const response = await axiosInstance.get(`/campers/${id}`);

  return response.data;
};

export const getFilteredCampers = async (filters = {}) => {
  const response = await axiosInstance.get("/campers", {
    params: buildCampersQueryParams(filters),
  });

  return response.data;
};
