import { PopupActiveProps, PopupItems } from "propTypes";
import { Popup } from "components";
import { useState } from "react";
import styles from "./SortPopup.module.scss";
import { useRouter } from "next/dist/client/router";
import axios from "axios";
export const SortPopup = () => {
  const router = useRouter();

  const [activePopup, setActivePopup] = useState(false);
  const [activeType, setActiveType] = useState({
    name: "популярности",
    type: "views",
    order: "desc",
  });

  const sortNames: PopupItems[] = [
    {
      name: "популярности",
      type: "views",
      order: "desc",
      onClickPopup({ name, type, order }: PopupActiveProps) {
        // router.push(
        //   {
        //     pathname: "/tests",
        //     query: { sort: type },
        //   },
        //   `/tests?sort=${type}`,
        //   { shallow: false }
        // );

        setActiveType({ name, type, order });
      },
    },
    {
      name: "дате ",
      type: "date",
      onClickPopup({ name, type, order }: PopupActiveProps) {
        // router.push(
        //   {
        //     pathname: "/tests",
        //     query: { sort: type },
        //   },
        //   `/tests?sort=${type}`,
        //   { shallow: false }
        // );
        setActiveType({ name, type, order });
      },
    },
    {
      name: "лайкам",
      type: "likes",
      onClickPopup({ name, type, order }: PopupActiveProps) {
        // router.push(
        //   {
        //     pathname: "/tests",
        //     query: { sort: type },
        //   },
        //   "/tests",
        //   { shallow: false }
        // );

        setActiveType({ name, type, order });
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
