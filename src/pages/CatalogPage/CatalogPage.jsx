import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CamperList } from "../../components/CamperList/CamperList";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { Filters } from "../../components/Filters/Filters";
import { Loader } from "../../components/Loader/Loader";
import {
  fetchCampers,
  fetchFilteredCampers,
} from "../../redux/campers/campersOperations";
import {
  clearCampers,
  incrementPage,
  setActiveQuery,
} from "../../redux/campers/campersSlice";
import {
  selectActiveCampersQuery,
  selectCampers,
  selectCampersError,
  selectCampersLimit,
  selectCampersLoading,
  selectCampersPage,
  selectCampersTotal,
  selectHasMoreCampers,
} from "../../redux/campers/campersSelectors";
import { selectFilters } from "../../redux/filters/filtersSelectors";
import {
  buildCampersRequestParams,
  hasActiveFilters,
} from "../../utils/helpers";
import css from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectCampersLoading);
  const error = useSelector(selectCampersError);
  const page = useSelector(selectCampersPage);
  const limit = useSelector(selectCampersLimit);
  const hasMore = useSelector(selectHasMoreCampers);
  const total = useSelector(selectCampersTotal);
  const filters = useSelector(selectFilters);
  const activeQuery = useSelector(selectActiveCampersQuery);

  useEffect(() => {
    const requestParams = buildCampersRequestParams(activeQuery, page, limit);

    if (hasActiveFilters(activeQuery)) {
      dispatch(fetchFilteredCampers(requestParams));

      return;
    }

    dispatch(fetchCampers(requestParams));
  }, [activeQuery, dispatch, page, limit]);

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  const handleSearch = (isReset = false) => {
    if (isReset) {
      dispatch(setActiveQuery({}));
      dispatch(clearCampers());

      return;
    }

    dispatch(setActiveQuery(filters));
    dispatch(clearCampers());
  };

  return (
    <section className={css.section}>
      <div className={css.container}>
        <Filters onSearch={handleSearch} />

        <div className={css.content}>
          <div className={css.headline}>
            <p className={css.counter}>Found: {total || campers.length}</p>
          </div>

          {isLoading && campers.length === 0 ? <Loader /> : null}
          {error ? <p className={css.error}>{error}</p> : null}
          {!isLoading && campers.length === 0 && !error ? <EmptyState /> : null}
          {campers.length > 0 ? <CamperList campers={campers} /> : null}

          {isLoading && campers.length > 0 ? <Loader /> : null}

          {hasMore && campers.length > 0 && !isLoading ? (
            <button className={css.loadMoreButton} onClick={handleLoadMore} type="button">
              Load More
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default CatalogPage;
