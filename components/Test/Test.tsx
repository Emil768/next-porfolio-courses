import { TestProps } from "propTypes";
import styles from "./Test.module.scss";

import { LikeIcon, UnlikeIcon } from "public/icons";

import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { fetchAddLike, fetchRemoveLike } from "@redux/slices";
import Link from "next/link";

export const Test = ({
  _id,
  title,
  text,
  category,
  user,
  likes,
  backgroundImage,
}: TestProps) => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.auth);

  const checkTestId = likes.find((item) => item.likeBy._id === data?._id);

  const onLikeTest = async () => dispatch(fetchAddLike(_id));
  const onUnlikeTest = async () => dispatch(fetchRemoveLike(_id));

  return (
    <div className={styles.note}>
      <img
        className={styles.note__backgroundImage}
        src={backgroundImage.url}
        alt="preview"
      />

      <div className={styles.note__content}>
        <span className={styles.note__info}>
          <span className={styles.note__category}>
            <i className={styles.circle}></i> {category.label}
          </span>
          <span className={styles.author}>
            <img
              src={`${user.avatarUrl.url}`}
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
                    <img src={item.likeBy.avatarUrl.url} alt="avatar" />
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
