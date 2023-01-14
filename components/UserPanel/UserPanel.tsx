import { useState } from "react";
import { PopupItems, TestProps, UserProps } from "propTypes";
import { Popup } from "components";

import { ArrowIcon } from "public/icons";

import styles from "./UserPanel.module.scss";
import useAuthStore from "store/auth";

export const UserPanel = ({ _id, avatarUrl }: UserProps) => {
  const [userState, setUserState] = useState(false);
  const { logout } = useAuthStore();
  const userSettings: PopupItems[] = [
    {
      name: "Профиль",
      link: `/user/${_id}`,
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
        <img src={avatarUrl.url} alt="" className={styles.author__avatar} />
        <ArrowIcon className={styles.user__panelArrow} />
      </div>
      <Popup active={userState} items={userSettings} />
    </div>
  );
};
