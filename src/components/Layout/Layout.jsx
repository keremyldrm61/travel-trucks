import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import css from "./Layout.module.css";

export const Layout = () => {
  return (
    <div className={css.shell}>
      <Header />
      <main className={css.main}>
        <Outlet />
      </main>
    </div>
  );
};
