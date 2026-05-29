import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import alcoveIcon from "../../assets/icons/alcove-icon.svg";
import automaticIcon from "../../assets/icons/automatic-icon.svg";
import locationIcon from "../../assets/icons/location-icon.svg";
import petrolIcon from "../../assets/icons/petrol-icon.svg";
import ratingIcon from "../../assets/icons/rating-icon.svg";
import { toggleFavorite } from "../../redux/favorites/favoritesSlice";
import { selectIsFavorite } from "../../redux/favorites/favoritesSelectors";
import {
  formatPrice,
  getCamperPreviewImage,
  getReviewsCount,
} from "../../utils/helpers";
import css from "./CamperCard.module.css";

export const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectIsFavorite(camper.id));
  const previewImage = getCamperPreviewImage(camper);
  const reviewsCount = getReviewsCount(camper.reviews);

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(camper));
  };

  return (
    <article className={css.card}>
      <img alt={camper.name} className={css.image} src={previewImage} />

      <div className={css.content}>
        <div className={css.header}>
          <div>
            <h2 className={css.title}>{camper.name}</h2>
            <div className={css.meta}>
              <span className={css.ratingItem}>
                <img
                  alt=""
                  aria-hidden="true"
                  className={css.ratingIcon}
                  src={ratingIcon}
                />
                <span className={css.rating}>
                  {camper.rating}({reviewsCount} Reviews)
                </span>
              </span>
              <span className={css.ratingItem}>
                <img
                  alt=""
                  aria-hidden="true"
                  className={css.ratingIcon}
                  src={locationIcon}
                />
                <span className={css.location}>{camper.location}</span>
              </span>
            </div>
          </div>

          <div className={css.priceWrap}>
            <p className={css.price}>{formatPrice(camper.price)}</p>
            <button
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              className={
                isFavorite
                  ? `${css.favoriteButton} ${css.favoriteButtonActive}`
                  : css.favoriteButton
              }
              onClick={handleFavoriteClick}
              type="button"
            >
              ♥
            </button>
          </div>
        </div>

        <p className={css.description}>{camper.description}</p>

        <ul className={css.features}>
          <li className={css.feature}>
            <img
              alt=""
              aria-hidden="true"
              className={css.featureIcon}
              src={petrolIcon}
            />
            {camper.engine}
          </li>
          <li className={css.feature}>
            <img
              alt=""
              aria-hidden="true"
              className={css.featureIcon}
              src={automaticIcon}
            />
            {camper.transmission}
          </li>
          <li className={css.feature}>
            <img
              alt=""
              aria-hidden="true"
              className={css.featureIcon}
              src={alcoveIcon}
            />
            {camper.form}
          </li>
        </ul>

        <Link
          className={css.button}
          rel="noreferrer"
          target="_blank"
          to={`/catalog/${camper.id}`}
        >
          Show More
        </Link>
      </div>
    </article>
  );
};
