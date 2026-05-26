import { useParams } from "react-router-dom";
import css from "./CamperDetailsPage.module.css";

export const CamperDetailsPage = () => {
  const { id } = useParams();

  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.title}>Camper Details Page</h1>
        <p className={css.text}>
          Selected camper ID: <span className={css.code}>{id}</span>
        </p>
        <p className={css.text}>
          In Step 10, we will fetch the camper details, gallery, reviews, and feature blocks
          for this route.
        </p>
      </div>
    </section>
  );
};
