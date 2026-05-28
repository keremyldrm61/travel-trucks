import { NavLink, useLocation } from "react-router-dom";
import css from "./Navigation.module.css";

const buildLinkClassName = ({ isActive }) =>
  isActive ? `${css.link} ${css.active}` : css.link;

export const Navigation = () => {
  const { pathname } = useLocation();
  const isDetailsPage = pathname.startsWith("/catalog/");

  return (
    <nav aria-label="Primary navigation">
      <ul className={isDetailsPage ? `${css.list} ${css.detailsList}` : css.list}>
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
