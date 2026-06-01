import { Link } from "react-router-dom";
import css from "./NotFound.module.css";

const NotFoundPage = () => {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.title}>Page not found</h1>
        <p className={css.text}>The page you are looking for does not exist.</p>
        <Link className={css.link} to="/">
          Return home
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
