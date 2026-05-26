import { Link } from "react-router-dom";
import { Navigation } from "../Navigation/Navigation";
import logoIcon from "../../assets/icons/logo-icon.svg";
import css from "./Header.module.css";

export const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link className={css.logoLink} to="/" aria-label="TravelTrucks home">
          <img alt="Travel Trucks Logo" src={logoIcon} />
        </Link>
        <Navigation />
        <div aria-hidden="true" className={css.balance} />
      </div>
    </header>
  );
};
