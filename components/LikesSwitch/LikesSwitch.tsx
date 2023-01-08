import styles from "./LikesSwitch.module.scss";

import { TestProps, UserProps } from "propTypes";

import { options } from "data";
import Link from "next/link";

interface LikesSwitchProps {
  user: UserProps;
  data: TestProps[];
}

export const LikesSwitch = ({ user, data }: LikesSwitchProps) => (
  <div className={styles.user__likes} data-testid="LikesSwitch">
    {data.length ? (
      data.map((item) => (
        <div className={styles.user__infoBlock} key={item._id}>
          <img
            className={styles.user__infoImage}
            src={user.avatarUrl.url}
            alt="avatar"
          />
          <div className={styles.user__infoText}>
            {user.fullName} понравился тест{" "}
            <Link href={`/tests/${item._id}`}>
              <b>«{item.title}»</b>
            </Link>{" "}
            автора
            <Link href={`/user/${item.user._id}`}>
              <b> {item.user.fullName}</b>
            </Link>
            <span className={styles.user__date}>
              {new Date(item.likes[0].createdAt).toLocaleDateString(
                "ru-RU",
                options
              )}
            </span>
          </div>
        </div>
      ))
    ) : (
      <div className={styles.user__empty}>
        {user.fullName} пока не лайкнул(а) ни одной публикации.
      </div>
    )}
  </div>
);
