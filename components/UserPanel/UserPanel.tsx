import { useState } from "react";
import { PopupItems, UserProps } from "propTypes";
import { Popup } from "components";

import { ArrowIcon } from "public/icons";

import styles from "./UserPanel.module.scss";
import useAuthStore from "store/auth";
import Image from "next/legacy/image";

export const UserPanel = ({ _id, avatarUrl, role }: UserProps) => {
  const [userState, setUserState] = useState(false);
  const { logout } = useAuthStore();
  const userSettings: PopupItems[] =
    role === "admin"
      ? [
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
        ]
      : [
          {
            name: "Профиль",
            link: `/user/${_id}`,
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

  const onToggleState = () => setUserState(false);

  return (
    <div className={styles.user__panel} data-testid="UserPanel">
      <div className={styles.author} onClick={() => setUserState(!userState)}>
        <Image
          width={45}
          height={45}
          unoptimized={true}
          src={avatarUrl.url}
          alt="avatar user"
          className={styles.author__avatar}
        />
        <ArrowIcon className={styles.user__panelArrow} />
      </div>
      <Popup
        active={userState}
        items={userSettings}
        setStatePopup={onToggleState}
      />
    </div>
  );
};
