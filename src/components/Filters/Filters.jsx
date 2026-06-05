import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import closeIcon from "../../assets/icons/close-icon.svg";
import locationIcon from "../../assets/icons/location-icon.svg";
import { toggleFavorite } from "../../redux/favorites/favoritesSlice";
import { selectFavoriteIds, selectFavorites } from "../../redux/favorites/favoritesSelectors";
import { resetFilters, setFilters } from "../../redux/filters/filtersSlice";
import { selectFilters } from "../../redux/filters/filtersSelectors";
import {
  ENGINE_OPTIONS,
  FEATURE_OPTIONS,
  TRANSMISSION_OPTIONS,
  VEHICLE_TYPE_OPTIONS,
} from "../../utils/constants";
import css from "./Filters.module.css";

export const Filters = ({ onSearch }) => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const favoriteCampers = useSelector(selectFavorites);
  const favoriteIds = useSelector(selectFavoriteIds);

  const handleLocationChange = (event) => {
    dispatch(setFilters({ location: event.target.value }));
  };

  const handleFormChange = (value) => {
    dispatch(setFilters({ form: filters.form === value ? "" : value }));
  };

  const handleEngineChange = (value) => {
    dispatch(setFilters({ engine: filters.engine === value ? "" : value }));
  };

  const handleTransmissionChange = (value) => {
    dispatch(
      setFilters({
        transmission: filters.transmission === value ? "" : value,
      })
    );
  };

  const handleFeatureToggle = (value) => {
    dispatch(setFilters({ [value]: !filters[value] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  const handleReset = () => {
    dispatch(resetFilters());
    onSearch(true);
  };

  const handleRemoveFavorite = (camperId) => {
    dispatch(toggleFavorite(camperId));
  };

  return (
    <aside className={css.sidebar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.group}>
          <label className={css.label} htmlFor="location">
            Location
          </label>
          <div className={css.inputWrap}>
            <img alt="" aria-hidden="true" className={css.inputIcon} src={locationIcon} />
            <input
              className={css.input}
              id="location"
              name="location"
              onChange={handleLocationChange}
              placeholder="City"
              type="text"
              value={filters.location}
            />
          </div>
        </div>

        <div className={css.block}>
          <p className={css.blockTitle}>Filters</p>

          <div className={css.group}>
            <p className={css.sectionTitle}>Camper form</p>
            <div className={css.radioList}>
              {VEHICLE_TYPE_OPTIONS.map((type) => (
                <label className={css.radioOption} key={type.value}>
                  <input
                    checked={filters.form === type.value}
                    className={css.nativeControl}
                    name="camper-form"
                    onChange={() => handleFormChange(type.value)}
                    type="radio"
                  />
                  <span className={css.radio} />
                  {type.label}
                </label>
              ))}
            </div>
          </div>

          <div className={css.group}>
            <p className={css.sectionTitle}>Engine</p>
            <div className={css.radioList}>
              {ENGINE_OPTIONS.map((option) => (
                <label className={css.radioOption} key={option.value}>
                  <input
                    checked={filters.engine === option.value}
                    className={css.nativeControl}
                    name="engine"
                    onChange={() => handleEngineChange(option.value)}
                    type="radio"
                  />
                  <span className={css.radio} />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className={css.group}>
            <p className={css.sectionTitle}>Transmission</p>
            <div className={css.radioList}>
              {TRANSMISSION_OPTIONS.map((option) => (
                <label className={css.radioOption} key={option.value}>
                  <input
                    checked={filters.transmission === option.value}
                    className={css.nativeControl}
                    name="transmission"
                    onChange={() => handleTransmissionChange(option.value)}
                    type="radio"
                  />
                  <span className={css.radio} />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className={css.group}>
            <p className={css.sectionTitle}>Features</p>
            <div className={css.checkboxList}>
              {FEATURE_OPTIONS.map((option) => (
                <label className={css.checkboxOption} key={option.value}>
                  <input
                    checked={Boolean(filters[option.value])}
                    className={css.nativeControl}
                    onChange={() => handleFeatureToggle(option.value)}
                    type="checkbox"
                  />
                  <span className={css.checkbox} />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className={css.actions}>
          <button className={css.searchButton} type="submit">
            Search
          </button>
          <button className={css.resetButton} onClick={handleReset} type="button">
            <img alt="" aria-hidden="true" className={css.resetIcon} src={closeIcon} />
            Clear filters
          </button>
        </div>

        <div className={css.favoritesBlock}>
          <div className={css.favoritesHeader}>
            <p className={css.blockTitle}>Favorites</p>
            <span className={css.favoritesCount}>{favoriteIds.length}</span>
          </div>

          {favoriteIds.length === 0 ? (
            <p className={css.favoritesEmpty}>
              Add campers to favorites and they will appear here.
            </p>
          ) : null}

          {favoriteCampers.length > 0 ? (
            <ul className={css.favoritesList}>
              {favoriteCampers.map((camper) => (
                <li className={css.favoriteItem} key={camper.id}>
                  <Link
                    className={css.favoriteLink}
                    rel="noreferrer"
                    target="_blank"
                    to={`/catalog/${camper.id}`}
                  >
                    <p className={css.favoriteName}>{camper.name}</p>
                    <p className={css.favoriteLocation}>{camper.location}</p>
                  </Link>

                  <button
                    aria-label={`Remove ${camper.name} from favorites`}
                    className={css.favoriteRemove}
                    onClick={() => handleRemoveFavorite(camper.id)}
                    type="button"
                  >
                    <img
                      alt=""
                      aria-hidden="true"
                      className={css.favoriteRemoveIcon}
                      src={closeIcon}
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          {favoriteIds.length > 0 && favoriteCampers.length === 0 ? (
            <p className={css.favoritesHint}>
              Saved campers will appear here when they are loaded in the catalog list.
            </p>
          ) : null}
        </div>
      </form>
    </aside>
  );
};
