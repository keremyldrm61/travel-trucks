import css from "./CatalogPage.module.css";

export const CatalogPage = () => {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.title}>Catalog Page</h1>
        <p className={css.text}>
          Camper list, filters, favorites, load more, and loading states will be built here in
          the next steps.
        </p>
      </div>
    </section>
  );
};
