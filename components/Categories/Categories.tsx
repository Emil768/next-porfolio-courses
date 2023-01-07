import styles from "./Categories.module.scss";

import { categoryNames } from "data";
import Link from "next/link";

export const Categories = () => {
  return (
    <div className={styles.categories}>
      <ul className={styles.categories__list}>
        <li className={styles.categories__item}>
          <Link href={"/tests"}>
            {/* //   className={({ isActive }) =>
          //     isActive
          //       ? [styles.categories__link, styles.categories__linkActive].join(
          //           " "
          //         )
          //       : styles.categories__link
          //   }
          //   to={"/tests"}
          // > */}
            Все
          </Link>
        </li>
        {categoryNames.map((item, index) => (
          <li key={index} className={styles.categories__item}>
            <Link
              href={`/category/${item.link}`}
              // className={({ isActive }) =>
              //   isActive
              //     ? [
              //         styles.categories__link,
              //         styles.categories__linkActive,
              //       ].join(" ")
              //     : styles.categories__link
              // }
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
