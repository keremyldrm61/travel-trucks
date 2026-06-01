import css from "./Loader.module.css";

export const Loader = ({ text = "Loading campers..." }) => {
  return (
    <div className={css.wrapper}>
      <div aria-hidden="true" className={css.spinner} />
      <p className={css.text}>{text}</p>
    </div>
  );
};
