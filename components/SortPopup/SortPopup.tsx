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
        router.push(
          {
            pathname: `/${router.asPath}/?sort=${type}`,
            query: { sort: type },
          },
          `/${router.asPath}/?sort=${type}`,
          { shallow: true }
        );
        setActiveType({ name, type, order });
      },
    },
    {
      name: "дате ",
      type: "date",
      onClickPopup({ name, type, order }: PopupActiveProps) {
        router.push(
          {
            pathname: `/${router.asPath}/?sort=${type}`,
            query: { sort: type, order },
          },
          `/${router.asPath}/?sort=${type}`,
          { shallow: true }
        );
        setActiveType({ name, type, order });
      },
    },
    {
      name: "лайкам",
      type: "likes",
      onClickPopup({ name, type, order }: PopupActiveProps) {
        router.push(
          {
            pathname: `/${router.asPath}/?sort=${type}`,
            query: { sort: type, order },
          },
          `/${router.asPath}/?sort=${type}`,
          { shallow: true }
        );
        setActiveType({ name, type, order });
      },
    },
  ];

  console.log(router.asPath);

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
