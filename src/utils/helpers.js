import { PRICE_CURRENCY_SYMBOL } from "./constants";

export const formatPrice = (price) =>
  `${PRICE_CURRENCY_SYMBOL}${Number(price).toFixed(2)}`;

export const getReviewsCount = (reviews = []) => reviews.length;

export const getReviewerInitial = (name = "") =>
  name.trim().charAt(0).toUpperCase();

export const getCamperPreviewImage = (camper) =>
  camper?.gallery?.[0]?.thumb ?? camper?.gallery?.[0]?.original ?? "";

export const buildCamperFeatures = (camper) =>
  [
    camper?.transmission,
    camper?.AC ? "AC" : null,
    camper?.engine,
    camper?.kitchen ? "Kitchen" : null,
    camper?.radio ? "Radio" : null,
    camper?.form,
    camper?.bathroom ? "Bathroom" : null,
    camper?.TV ? "TV" : null,
    camper?.refrigerator ? "Refrigerator" : null,
    camper?.microwave ? "Microwave" : null,
    camper?.gas ? "Gas" : null,
    camper?.water ? "Water" : null,
  ].filter(Boolean);
