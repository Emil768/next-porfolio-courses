import styles from "./Categories.module.scss";

import Link from "next/link";
import { useRouter } from "next/dist/client/router";

export const Categories = () => {
  const router = useRouter();

  return (
    <div className={styles.categories}>
      <ul className={styles.categories__list}>
        <li className={styles.categories__item}>
          <Link
            href={"/tests"}
            className={
              router.asPath === "/tests"
                ? [styles.categories__link, styles.categories__linkActive].join(
                    " "
                  )
                : styles.categories__link
            }
          >
            Все
          </Link>
        </li>

        <li className={styles.categories__item}>
          <Link
            href={"/tests/category/tests"}
            className={
              router.asPath === "/tests/category/tests"
                ? [styles.categories__link, styles.categories__linkActive].join(
                    " "
                  )
                : styles.categories__link
            }
          >
            Тесты
          </Link>
        </li>
        <li className={styles.categories__item}>
          <Link
            href={"/tests/category/offers"}
            className={
              router.asPath === "/tests/category/offers"
                ? [styles.categories__link, styles.categories__linkActive].join(
                    " "
                  )
                : styles.categories__link
            }
          >
            Тесты / Предложения
          </Link>
        </li>
      </ul>
    </div>
  );
};
