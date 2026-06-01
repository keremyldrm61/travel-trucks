import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BookingForm } from "../../components/BookingForm/BookingForm";
import { Loader } from "../../components/Loader/Loader";
import { Reviews } from "../../components/Reviews/Reviews";
import locationIcon from "../../assets/icons/location-icon.svg";
import ratingIcon from "../../assets/icons/rating-icon.svg";
import { fetchCamperDetails } from "../../redux/campers/campersOperations";
import { clearSelectedCamper } from "../../redux/campers/campersSlice";
import {
  selectCampersError,
  selectCampersLoading,
  selectSelectedCamper,
} from "../../redux/campers/campersSelectors";
import { CAMPER_DETAIL_FIELDS } from "../../utils/constants";
import {
  buildCamperFeatures,
  formatPrice,
  getReviewsCount,
} from "../../utils/helpers";
import css from "./CamperDetailsPage.module.css";

const CamperDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const camper = useSelector(selectSelectedCamper);
  const isLoading = useSelector(selectCampersLoading);
  const error = useSelector(selectCampersError);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(fetchCamperDetails(id));

    return () => {
      dispatch(clearSelectedCamper());
    };
  }, [dispatch, id]);

  if (isLoading && !camper) {
    return (
      <section className={css.section}>
        <div className={css.container}>
          <Loader />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={css.section}>
        <div className={css.container}>
          <p className={css.error}>{error}</p>
        </div>
      </section>
    );
  }

  if (!camper) {
    return null;
  }

  const gallery = camper.gallery ?? [];
  const activeImage = gallery.some((image) => image.original === selectedImage)
    ? selectedImage
    : gallery[0]?.original;
  const features = buildCamperFeatures(camper);
  const reviewsCount = getReviewsCount(camper.reviews);

  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.topGrid}>
          <div className={css.galleryColumn}>
            <div className={css.heroImageWrap}>
              <img
                alt={camper.name}
                className={css.heroImage}
                src={activeImage}
              />
            </div>

            <ul className={css.thumbs}>
              {gallery.map((image, index) => (
                <li key={image.thumb ?? image.original}>
                  <button
                    className={
                      activeImage === image.original
                        ? `${css.thumbButton} ${css.thumbButtonActive}`
                        : css.thumbButton
                    }
                    onClick={() => setSelectedImage(image.original)}
                    type="button"
                  >
                    <img
                      alt={`${camper.name} gallery view ${index + 1}`}
                      className={css.thumbImage}
                      src={image.thumb ?? image.original}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={css.infoColumn}>
            <div className={css.infoCard}>
              <h1 className={css.title}>{camper.name}</h1>

              <div className={css.meta}>
                <span className={css.metaItem}>
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
                <span className={css.metaItem}>
                  <img
                    alt=""
                    aria-hidden="true"
                    className={css.ratingIcon}
                    src={locationIcon}
                  />
                  <span>{camper.location}</span>
                </span>
              </div>

              <p className={css.price}>{formatPrice(camper.price)}</p>
              <p className={css.description}>{camper.description}</p>
            </div>

            <div className={css.infoCard}>
              <h2 className={css.cardTitle}>Vehicle details</h2>

              <ul className={css.features}>
                {features.map((feature) => (
                  <li className={css.feature} key={feature}>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div aria-hidden="true" className={css.divider} />

              <ul className={css.detailsList}>
                {CAMPER_DETAIL_FIELDS.map((item) => (
                  <li className={css.detailRow} key={item.key}>
                    <span className={css.detailLabel}>{item.label}</span>
                    <span className={css.detailValue}>{camper[item.key]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={css.bottomGrid}>
          <Reviews reviews={camper.reviews} />
          <BookingForm />
        </div>
      </div>
    </section>
  );
};

export default CamperDetailsPage;
