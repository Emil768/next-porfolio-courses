import styles from "./Header.module.scss";
// import { UserPanel } from "@components";
// import { useAppSelector } from "@redux/hooks";

import { LogoIcon } from "public/gallery";
import { useState } from "react";
import Link from "next/link";

export const Header = () => {
  // const isAuth = useAppSelector((state) => Boolean(state.auth.data));
  const [menuActive, setMenuActive] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        header
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
          // className={
          //   menuActive
          //     ? isAuth
          //       ? [
          //           styles.header__list,
          //           styles.header__listAuth,
          //           styles.header__listActive,
          //         ].join(" ")
          //       : [styles.header__list, styles.header__listActive].join(" ")
          //     : styles.header__list
          // }
          >
            <li className={styles.header__item}>
              <Link href={"/"}>
                {/* className={({ isActive }) =>
                  isActive
                    ? [styles.header__link, styles.header__linkActive].join(" ")
                    : styles.header__link
                } >*/}
                Обо мне
              </Link>
            </li>
            <li className={styles.header__item}>
              <Link href={"/programs"}>
                {/* className={({ isActive }) =>
                  isActive
                    ? [styles.header__link, styles.header__linkActive].join(" ")
                    : styles.header__link
                }
                to={"/programs"}
              > */}
                Программа курса
              </Link>
            </li>
            <li className={styles.header__item}>
              <Link href={"/tariffs"}>
                {/* className={({ isActive }) =>
                  isActive
                    ? [styles.header__link, styles.header__linkActive].join(" ")
                    : styles.header__link
                }
                to={"/tariffs"}
              > */}
                Тарифы
              </Link>
            </li>

            <li className={styles.header__item}>
              <Link href={"/tests"}>
                {/* className={({ isActive }) =>
                  isActive
                    ? [styles.header__link, styles.header__linkActive].join(" ")
                    : styles.header__link
                }
                to={"/tests"}
              > */}
                Тесты
              </Link>
            </li>
          </ul>
          {/* {isAuth ? <UserPanel /> : null} */}
        </div>
      </div>
    </header>
  );
};
