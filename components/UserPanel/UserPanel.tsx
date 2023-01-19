import { useState } from "react";
import { PopupItems, UserProps } from "propTypes";
import { Popup } from "components";

import { ArrowIcon } from "public/icons";

import styles from "./UserPanel.module.scss";
import useAuthStore from "store/auth";
import Image from "next/legacy/image";

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
        <Image
          width={45}
          height={45}
          unoptimized={true}
          src={avatarUrl.url}
          alt=""
          className={styles.author__avatar}
        />
        <ArrowIcon className={styles.user__panelArrow} />
      </div>
      <Popup active={userState} items={userSettings} />
    </div>
  );
};
