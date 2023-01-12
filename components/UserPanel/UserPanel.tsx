import { useState } from "react";
import { PopupItems } from "propTypes";
import { Popup } from "components";

import { ArrowIcon } from "public/icons";
import { useAuthStore } from "store";

import styles from "./UserPanel.module.scss";

export const UserPanel = () => {
  const { user, logout } = useAuthStore();
  const [userState, setUserState] = useState(false);
  const userSettings: PopupItems[] = [
    {
      name: "Профиль",
      link: `/user/${user._id}`,
    },
    {
      name: "Добавить тест",
      link: "/addTest",
    },
    {
      name: "Выйти",
      onClickPopup() {
        if (window.confirm("Вы действительно хотите выйти?")) {
          logout();
          window.localStorage.removeItem("token");
        }
      },
    },
  ];

  return (
    <div className={styles.user__panel} data-testid="UserPanel">
      <div className={styles.author} onClick={() => setUserState(!userState)}>
        <img
          src={user.avatarUrl.url}
          alt=""
          className={styles.author__avatar}
        />
        <ArrowIcon className={styles.user__panelArrow} />
      </div>
      <Popup active={userState} items={userSettings} />
    </div>
  );
};
