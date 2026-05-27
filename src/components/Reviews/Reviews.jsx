import ratingIconEmpty from "../../assets/icons/rating-icon-empty.svg";
import ratingIcon from "../../assets/icons/rating-icon.svg";
import { MAX_REVIEW_STARS } from "../../utils/constants";
import { getReviewerInitial } from "../../utils/helpers";
import css from "./Reviews.module.css";

export const Reviews = ({ reviews = [] }) => {
  if (reviews.length === 0) {
    return (
      <section className={css.section}>
        <h2 className={css.title}>Reviews</h2>
        <div className={css.empty}>
          <p className={css.emptyText}>There are no reviews for this camper yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={css.section}>
      <h2 className={css.title}>Reviews</h2>

      <ul className={css.list}>
        {reviews.map((review, index) => (
          <li className={css.card} key={`${review.reviewer_name}-${index}`}>
            <div className={css.header}>
              <div className={css.avatar}>{getReviewerInitial(review.reviewer_name)}</div>
              <div className={css.meta}>
                <p className={css.name}>{review.reviewer_name}</p>
                <div className={css.stars}>
                  {Array.from({ length: MAX_REVIEW_STARS }, (_, index) => (
                    <img
                      alt=""
                      aria-hidden="true"
                      className={css.starIcon}
                      key={`${review.reviewer_name}-star-${index}`}
                      src={index < review.reviewer_rating ? ratingIcon : ratingIconEmpty}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className={css.comment}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
