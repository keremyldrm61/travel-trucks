import css from "./EmptyState.module.css";

export const EmptyState = () => {
  return (
    <div className={css.state}>
      <h2 className={css.title}>No campers found</h2>
      <p className={css.text}>
        Try changing your filters or reset the search to see all available campers.
      </p>
    </div>
  );
};
