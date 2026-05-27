import { CamperCard } from "../CamperCard/CamperCard";
import css from "./CamperList.module.css";

export const CamperList = ({ campers }) => {
  return (
    <ul className={css.list}>
      {campers.map((camper) => (
        <li className={css.item} key={camper.id}>
          <CamperCard camper={camper} />
        </li>
      ))}
    </ul>
  );
};
