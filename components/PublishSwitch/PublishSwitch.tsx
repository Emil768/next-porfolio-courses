import { options } from "data";
import Link from "next/link";
import { TestProps, UserProps } from "propTypes";

import styles from "./PublishSwitch.module.scss";

interface PublishSwitchProps {
  user: UserProps;
  data: TestProps[];
}

export const PublishSwitch = ({ user, data }: PublishSwitchProps) => (
  <>
    {data.length ? (
      data.map((item) => (
        <div className={styles.user__infoBlock} key={item._id}>
          <img
            className={styles.user__infoImage}
            src={user.avatarUrl.url}
            alt="avatar"
          />
          <div className={styles.user__infoText}>
            {user.fullName} опубликовал(-а) тест
            <Link href={`/tests/${item._id}`}>
              <b> «{item.title}».</b>
            </Link>{" "}
            <span className={styles.user__date}>
              {new Date(item.createdAt).toLocaleDateString("ru-RU", options)}
            </span>
          </div>
        </div>
      ))
    ) : (
      <div className={styles.user__empty}>
        {user.fullName} пока не разместил(а) ни одной публикации.
      </div>
    )}
  </>
);
