import styles from "./InfoPanel.module.scss";

import { options } from "data";
import { TestProps } from "propTypes";
import Link from "next/link";

export const InfoPanel = ({
  createdAt,
  category,
  viewsCount,
  user,
}: TestProps) => (
  <div className={styles.fullTest__info}>
    <span>
      <i className={styles.circle}></i>{" "}
      <Link
        href={`/category/${category.value}`}
        className={styles.fullTest__category}
      >
        {category.label}
      </Link>
    </span>
    <span className={styles.fullTest__icon}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
      </svg>
      {viewsCount}
    </span>
    <span className={styles.fullTest__date}>
      {new Date(createdAt).toLocaleDateString("ru-RU", options)}
    </span>
    <Link href={`/user/${user._id}`} className={styles.author}>
      <img
        src={`${user.avatarUrl.url}`}
        alt=""
        className={styles.author__avatar}
      />
      <span className={styles.author__name}>{user.fullName}</span>
    </Link>
  </div>
);
