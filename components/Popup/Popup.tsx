import Link from "next/link";
import { PopupProps } from "propTypes";
import styles from "./Popup.module.scss";

export const Popup = ({ active, items, activeLabel }: PopupProps) => {
  return (
    <div
      className={
        active ? [styles.popup, styles.popup__active].join(" ") : styles.popup
      }
      data-testid="Popup"
    >
      <ul className={styles.popup__List}>
        {items.map((item, index) =>
          item.link ? (
            <li key={index}>
              <Link className={styles.popup__item} href={`${item.link}`}>
                {item.name}
              </Link>
            </li>
          ) : (
            <li
              className={
                activeLabel && activeLabel?.type === item.type
                  ? [styles.popup__item, styles.popup__itemActive].join(" ")
                  : styles.popup__item
              }
              key={index}
              onClick={() =>
                item.onClickPopup &&
                item.onClickPopup({ name: item.name, type: item.type! })!
              }
            >
              {item.name}
            </li>
          )
        )}
      </ul>
    </div>
  );
};
