import { useRef } from "react";

import styles from "./Comments.module.scss";

import { TestProps } from "propTypes";
import { CommentsBlock } from "components";
import Link from "next/link";
import axios from "utils/axios";
import useQuizStore from "store/quiz";
import useAuthStore from "store/auth";

export const Comments = () => {
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const { fetchAddComment, quiz } = useQuizStore();
  const { data } = useAuthStore();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (textRef.current?.value) {
      const comment = {
        testId: quiz._id,
        text: textRef.current?.value!,
      };

      fetchAddComment(comment);
      textRef.current.value = "";
    }
  };

  const handlerOnReplyComment = (name: string) => {
    if (textRef.current?.value !== undefined) {
      textRef.current.value = `@${name},`;
    }
  };

  const commentsCompleted = quiz.comments ? quiz.comments : [];

  return (
    <div className={styles.comments} data-testid="Comments">
      <div className={styles.comments__title}>
        Все комментарии
        <span className={styles.comments__length}>
          {commentsCompleted.length}
        </span>
      </div>
      <div className={styles.comments__content}>
        {commentsCompleted.map((item) => (
          <CommentsBlock
            {...item}
            key={item._id}
            testId={quiz._id}
            onReplyComment={handlerOnReplyComment}
          />
        ))}
      </div>

      {data._id ? (
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
          <Link href={"/auth/register"}>зарегистрироваться</Link> чтобы писать
          комментарии
        </div>
      )}
    </div>
  );
};
