import { axiosInstance } from "../../utils/axiosInstance";

const buildCampersQueryParams = (filters = {}) => {
  const params = {};

  if (filters.location) {
    params.location = filters.location;
  }

  if (filters.form) {
    params.form = filters.form;
  }

  if (filters.engine) {
    params.engine = filters.engine;
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

  if (filters.TV) {
    params.TV = filters.TV;
  }

  if (filters.radio) {
    params.radio = filters.radio;
  }

  if (filters.refrigerator) {
    params.refrigerator = filters.refrigerator;
  }

  if (filters.microwave) {
    params.microwave = filters.microwave;
  }

  if (filters.gas) {
    params.gas = filters.gas;
  }

  if (filters.water) {
    params.water = filters.water;
  }

  if (filters.page) {
    params.page = filters.page;
  }

  if (filters.limit) {
    params.limit = filters.limit;
  }

  return params;
};

const normalizeCampersResponse = (data) => ({
  items: data.items ?? data,
  total: data.total ?? data.length ?? 0,
});

export const getCampers = async (params = {}) => {
  try {
    const response = await axiosInstance.get("/campers", {
      params: buildCampersQueryParams(params),
    });

    return normalizeCampersResponse(response.data);
  } catch (error) {
    if (error.response?.status === 404) {
      return { items: [], total: 0 };
    }

    throw error;
  }
};

export const getCamperById = async (id) => {
  const response = await axiosInstance.get(`/campers/${id}`);

  return response.data;
};

export const getFilteredCampers = async (filters = {}) => {
  try {
    const response = await axiosInstance.get("/campers", {
      params: buildCampersQueryParams(filters),
    });

    return normalizeCampersResponse(response.data);
  } catch (error) {
    if (error.response?.status === 404) {
      return { items: [], total: 0 };
    }

    throw error;
  }
};
