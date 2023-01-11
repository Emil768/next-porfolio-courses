import styles from "./Header.module.scss";
import { UserPanel } from "components";
// import { useAppSelector } from "@redux/hooks";

import { LogoIcon } from "public/gallery";
import { useState } from "react";
import Link from "next/link";
import useAuthStore from "store/auth";
import { useRouter } from "next/router";

export const Header = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  const isAuth = Boolean(Object.keys(user).length !== 0);

  const [menuActive, setMenuActive] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Link href={"/"}>
          <img src={LogoIcon.src} className={styles.header__logo} alt="logo" />
        </Link>
        <div className={styles.header__panel}>
          <div
            className={styles.menuBtn}
            onClick={() => setMenuActive(!menuActive)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul
            className={
              menuActive
                ? isAuth
                  ? [
                      styles.header__list,
                      styles.header__listAuth,
                      styles.header__listActive,
                    ].join(" ")
                  : [styles.header__list, styles.header__listActive].join(" ")
                : styles.header__list
            }
          >
            <li className={styles.header__item}>
              <Link
                href={"/"}
                className={
                  router.pathname == "/"
                    ? [styles.header__link, styles.header__linkActive].join(" ")
                    : styles.header__link
                }
              >
                Обо мне
              </Link>
            </li>
            <li className={styles.header__item}>
              <Link
                href={"/programs"}
                className={
                  router.pathname == "/programs"
                    ? [styles.header__link, styles.header__linkActive].join(" ")
                    : styles.header__link
                }
              >
                Программа курса
              </Link>
            </li>
            <li className={styles.header__item}>
              <Link
                href={"/tariffs"}
                className={
                  router.pathname == "/tariffs"
                    ? [styles.header__link, styles.header__linkActive].join(" ")
                    : styles.header__link
                }
              >
                Тарифы
              </Link>
            </li>

            <li className={styles.header__item}>
              <Link
                href={"/tests"}
                className={
                  router.pathname == "/tests"
                    ? [styles.header__link, styles.header__linkActive].join(" ")
                    : styles.header__link
                }
              >
                Тесты
              </Link>
            </li>
          </ul>
          {isAuth ? <UserPanel /> : null}
        </div>
      </div>
    </header>
  );
};
