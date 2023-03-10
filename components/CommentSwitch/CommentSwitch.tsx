import { options } from "data";
import Link from "next/link";
import { CommentSwitchProps } from "propTypes";
import styles from "./CommentSwitch.module.scss";

import Image from "next/legacy/image";

export const CommentSwitch = ({ user, data }: CommentSwitchProps) => (
  <>
    {data.length ? (
      data.map((item) => (
        <div className={styles.user__infoBlock} key={item._id}>
          <Image
            width={48}
            height={48}
            unoptimized={true}
            className={styles.user__infoImage}
            src={user.avatarUrl.url}
            alt="avatar"
          />
          <div className={styles.user__infoText}>
            {user.fullName} прокоментировал(-а) тест{" "}
            <Link href={`/tests/${item._id}`}>
              <b>«{item.title}»</b>
            </Link>{" "}
            автора
            <Link href={`/user/${item.user._id}`}>
              <b> {item.user.fullName}</b>
            </Link>
            <span className={styles.user__date}>
              {new Date(item.comments[0].createdAt).toLocaleDateString(
                "ru-RU",
                options
              )}
            </span>
          </div>
        </div>
      ))
    ) : (
      <div className={styles.user__empty}>
        {user.fullName} пока не прокомментировал(а) ни одной публикации.
      </div>
    )}
  </>
);
