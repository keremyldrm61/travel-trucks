import { Link } from "react-router-dom";
import heroImage from "../../assets/images/hero.png";
import css from "./Hero.module.css";

export const Hero = () => {
  return (
    <section className={css.heroSection}>
      <div className={css.container}>
        <img
          src={heroImage}
          alt="TravelTrucks camper van in nature"
          className={css.heroImage}
        />
        <div className={css.content}>
          <div className={css.campers}>
            <h1 className={css.title}>Campers of your dreams</h1>
            <p className={css.text}>
              You can find everything you want in our catalog
            </p>
          </div>
          <Link className={css.button} to="/catalog">
            View Now
          </Link>
        </div>
      </div>
    </section>
  );
};
