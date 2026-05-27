import css from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={css.wrapper}>
      <div aria-hidden="true" className={css.spinner} />
      <p className={css.text}>Loading campers...</p>
    </div>
  );
};
