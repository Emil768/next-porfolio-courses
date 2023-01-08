import { PopupActiveProps, PopupItems } from "propTypes";
import { Popup } from "components";
import { useState } from "react";
import styles from "./SortPopup.module.scss";

import { useAppDispatch } from "redux/hooks";
import { fetchSortBy } from "redux/slices";

export const SortPopup = () => {
  const dispatch = useAppDispatch();
  const [activePopup, setActivePopup] = useState(false);
  const [activeType, setActiveType] = useState({
    name: "популярности",
    type: "views",
  });

  const sortNames: PopupItems[] = [
    {
      name: "популярности",
      type: "views",
      onClickPopup({ name, type }: PopupActiveProps) {
        dispatch(fetchSortBy("views"));
        setActiveType({ name, type });
      },
    },
    {
      name: "дате ",
      type: "date",
      onClickPopup({ name, type }: PopupActiveProps) {
        dispatch(fetchSortBy("date"));
        setActiveType({ name, type });
      },
    },
    {
      name: "лайкам",
      type: "likes",
      onClickPopup({ name, type }: PopupActiveProps) {
        dispatch(fetchSortBy("likes"));
        setActiveType({ name, type });
      },
    },
  ];

  return (
    <div className={styles.notes__sorted}>
      Сортировка по:
      <span
        onClick={() => setActivePopup(!activePopup)}
        className={styles.notes__pick}
      >
        {activeType.name}
      </span>
      <Popup active={activePopup} activeLabel={activeType} items={sortNames} />
    </div>
  );
};
