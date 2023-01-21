import { options } from "data";
import Link from "next/link";
import { TestSwitchProps } from "propTypes";

import styles from "./TestSwitch.module.scss";
import Image from "next/legacy/image";

export const TestSwitch = ({ user, data }: TestSwitchProps) => (
  <>
    {data.length ? (
      data.map((item) => {
        return (
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
              {user.fullName} прошел(-ла) тест
              <Link href={`/tests/${item._id}`}>
                <b> «{item.title}».</b>
              </Link>
              на <b>{item.score[0].totalScore} %</b>
              <span className={styles.user__date}>
                {new Date(item.score[0].createdAt).toLocaleDateString(
                  "ru-RU",
                  options
                )}
              </span>
            </div>
          </div>
        );
      })
    ) : (
      <div className={styles.user__empty}>
        {user.fullName} пока не прошел ни один тест
      </div>
    )}
  </>
);
