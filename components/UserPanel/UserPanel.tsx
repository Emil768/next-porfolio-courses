import { useState } from "react";
import styles from "./UserPanel.module.scss";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { logout } from "redux/slices";

import { PopupItems } from "propTypes";
import { Popup } from "components";

import { ArrowIcon } from "public/icons";

export const UserPanel = () => {
  const [userState, setUserState] = useState(false);
  const dispath = useAppDispatch();

  const { data } = useAppSelector((state) => state.auth);

  const userSettings: PopupItems[] = [
    {
      name: "Профиль",

      link: `/user/${data?._id}`,
    },
    {
      name: "Добавить тест",

      link: "/add-test",
    },
    {
      name: "Выйти",
      onClickPopup() {
        if (window.confirm("Вы действительно хотите выйти?")) {
          dispath(logout());
          window.localStorage.removeItem("token");
        }
      },
    },
  ];

  return (
    <div className={styles.user__panel} data-testid="UserPanel">
      <div className={styles.author} onClick={() => setUserState(!userState)}>
        <img
          src={data?.avatarUrl.url}
          alt=""
          className={styles.author__avatar}
        />
        <ArrowIcon className={styles.user__panelArrow} width={10} />
      </div>
      <Popup active={userState} items={userSettings} />
    </div>
  );
};
