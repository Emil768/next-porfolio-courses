import { useRef } from "react";

import styles from "./Comments.module.scss";

import { CommentsBlock } from "components";
import Link from "next/link";

import useAuthStore from "store/auth";
import { CommentProps, TestProps } from "propTypes";
import { useRouter } from "next/router";
import axios from "utils/axios";

export const Comments = ({ _id, comments }: TestProps) => {
  const router = useRouter();
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const { data } = useAuthStore();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (textRef.current?.value) {
        const comment = {
          testId: _id,
          text: textRef.current?.value,
        };

        const { data } = await axios.post<CommentProps>(`/comments`, {
          comment,
        });

        textRef.current.value = "";
        router.push({ pathname: router.asPath }, undefined, { scroll: false });
      }
    } catch (err) {
      alert("Не удалось создать комментарий");
    }
  };

  const handlerOnReplyComment = (name: string) => {
    if (textRef.current?.value !== undefined) {
      textRef.current.value = `@${name},`;
    }
  };

  return (
    <div className={styles.comments} data-testid="Comments">
      <div className={styles.comments__title}>
        Все комментарии
        <span className={styles.comments__length}>{comments.length}</span>
      </div>
      <div className={styles.comments__content}>
        {comments.map((item) => (
          <CommentsBlock
            {...item}
            key={item._id}
            testId={_id}
            onReplyComment={handlerOnReplyComment}
          />
        ))}
      </div>

      {data ? (
        <form className={styles.comments__form} onSubmit={onSubmit}>
          <textarea
            className={styles.comments__field}
            ref={textRef}
            placeholder="Комментарий..."
            name="comment"
            cols={30}
            rows={2}
            required
          ></textarea>
          <div className={styles.comments__buttons}>
            <button className={styles.comments__button} type="submit">
              Добавить
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.comments__warning}>
          Не забудьте <Link href={"/auth/login"}> войти</Link> или{" "}
          <Link href={"/auth/registration"}>зарегистрироваться</Link> чтобы
          писать комментарии
        </div>
      )}
    </div>
  );
};
