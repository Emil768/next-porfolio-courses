import { PopupActiveProps, PopupItems } from "propTypes";
import { Popup } from "components";
import { useState } from "react";
import styles from "./SortPopup.module.scss";
import { useRouter } from "next/dist/client/router";

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
      order: "asc",
      onClickPopup({ name, type, order }: PopupActiveProps) {
        router.push(
          {
            pathname: "/tests",
            query: { sort: type, order },
          },
          `/tests?sort=${type}&order=${order}`,
          { shallow: false }
        );
        setActiveType({ name, type, order });
      },
    },
    {
      name: "дате ",
      type: "date",
      order: "asc",
      onClickPopup({ name, type, order }: PopupActiveProps) {
        router.push(
          {
            pathname: "/tests",
            query: { sort: type, order },
          },
          `/tests?sort=${type}&order=${order}`,
          { shallow: false }
        );
        setActiveType({ name, type, order });
      },
    },
    {
      name: "лайкам",
      type: "likes",
      order: "asc",
      onClickPopup({ name, type, order }: PopupActiveProps) {
        router.push(
          {
            pathname: "/tests",
            query: { sort: type, order },
          },
          `/tests?sort=${type}&order=${order}`,
          { shallow: false }
        );
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
