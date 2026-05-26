import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const buildLinkClassName = ({ isActive }) =>
  isActive ? `${css.link} ${css.active}` : css.link;

export const Navigation = () => {
  return (
    <nav aria-label="Primary navigation">
      <ul className={css.list}>
        <li>
          <NavLink className={buildLinkClassName} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={buildLinkClassName} to="/catalog">
            Catalog
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
