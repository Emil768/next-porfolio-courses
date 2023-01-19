import { TestProps } from "propTypes";
import styles from "./Test.module.scss";

import { LikeIcon, UnlikeIcon } from "public/icons";
import Link from "next/link";
import useAuthStore from "store/auth";
import axios from "utils/axios";
import { useRouter } from "next/dist/client/router";
import Image from "next/legacy/image";

export const Test = ({
  test,
  setLoading,
}: {
  test: TestProps;
  setLoading: () => void;
}) => {
  const router = useRouter();
  const { data } = useAuthStore();

  const { _id, title, text, category, user, likes, backgroundImage } = test;
  const checkTestId = likes.find((item) => item.likeBy._id === data?._id);

  const onLikeTest = async () => {
    await axios.patch<TestProps>("/like", {
      testId: _id,
    });
    router.replace(router.asPath, undefined, {
      scroll: false,
    });
    setLoading();
  };
  const onUnlikeTest = async () => {
    await axios.patch<TestProps>("/unlike", {
      testId: _id,
    });
    router.replace(router.asPath, undefined, {
      scroll: false,
    });
    setLoading();
  };

  return (
    <div className={styles.note}>
      <Image
        className={styles.note__backgroundImage}
        width={400}
        height={200}
        src={backgroundImage.url}
        alt="preview"
      />

      <div className={styles.note__content}>
        <span className={styles.note__info}>
          <span className={styles.note__category}>
            <i className={styles.circle}></i> {category.label}
          </span>
          <span className={styles.author}>
            <Image
              src={`${user.avatarUrl.url}`}
              width={30}
              height={30}
              unoptimized={true}
              alt="avatar"
              className={styles.author__avatar}
            />
            <span className={styles.author__name}>{user.fullName}</span>
          </span>
        </span>
        <h2 className={styles.note__title} title={title}>
          {title}
        </h2>
        <p className={styles.note__text}>{text}</p>

        <div className={styles.note__bottom}>
          <Link href={`/tests/${_id}`} className={styles.note__link}>
            Пройти тест
          </Link>

          {data ? (
            <div className={styles.note__reactions}>
              <div className={styles.note__reactionUsers}>
                {likes.slice(-3).map((item) => (
                  <div className={styles.note__likeUser} key={item._id}>
                    <Image
                      layout="fill"
                      quality={100}
                      src={item.likeBy.avatarUrl.url}
                      alt="avatar user"
                    />
                  </div>
                ))}
              </div>

              {checkTestId ? (
                <div className={styles.note__reactionBlock}>
                  <LikeIcon
                    className={styles.note__likeIcon}
                    onClick={onUnlikeTest}
                    width={25}
                  />
                </div>
              ) : (
                <div className={styles.note__reactionBlock}>
                  <UnlikeIcon
                    className={styles.note__unlikeIcon}
                    onClick={onLikeTest}
                    width={25}
                  />
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
