import { Hero } from "../../components/Hero/Hero";
import css from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <div className={css.page}>
      <Hero />
    </div>
  );
};
