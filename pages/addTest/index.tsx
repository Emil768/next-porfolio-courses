import { useState, useEffect } from "react";
import styles from "styles/AddTest.module.scss";
import { TestProps } from "propTypes";
import { AddTestMain, AddTestQuestion } from "components";
import { useRouter } from "next/dist/client/router";

import axios from "utils/axios";
import useAuthStore from "store/auth";
import useTestStore from "store/test";
import Head from "next/head";

const AddTest = () => {
  const router = useRouter();
  const { data, addQuestion, clearState } = useTestStore();
  const user = useAuthStore((state) => state.data);

  const [isToggleNav, setIsToggleNav] = useState(true);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fields = {
      title: data.title,
      text: data.text,
      category: data.category,
      backgroundImage: data.bgImage,
      ques: data.questions,
    };

    try {
      const { data } = await axios.post<TestProps>("/tests", fields);
      clearState();
      router.push(`/tests/${data._id}`);
    } catch (err) {
      alert("Не удалось создать тест");
    }
  };

  const handlerAddQuestion = () => addQuestion();
  const handlerCancelQuestion = () => {
    clearState();
    router.push("/tests");
  };

  useEffect(() => {
    if (!user) {
      router.push("/");
    }

    clearState();
  }, []);

  return (
    <>
      <Head>
        <title>Добавить тест - Extra school</title>
        <meta property="og:title" content="Добавить тест - Extra school" />
        <meta
          property="og:image"
          content={
            "https://res.cloudinary.com/dl4ooiriz/image/upload/v1672837860/checklists_cover_m1f4zm.png"
          }
        />
        <meta property="og:type" content="website" />
      </Head>
      <form className={styles.addNote} onSubmit={onSubmit}>
        <div className={styles.addNote__content}>
          <div className={styles.addNote__top}>
            <ul className={styles.addNote__list}>
              <li
                className={
                  isToggleNav
                    ? [styles.addNote__item, styles.addNote__itemActive].join(
                        " "
                      )
                    : styles.addNote__item
                }
                onClick={() => setIsToggleNav(true)}
              >
                Основное
              </li>
              <li
                className={
                  isToggleNav
                    ? styles.addNote__item
                    : [styles.addNote__item, styles.addNote__itemActive].join(
                        " "
                      )
                }
                onClick={() => setIsToggleNav(false)}
              >
                Вопросы
              </li>
            </ul>
          </div>

          {isToggleNav ? <AddTestMain /> : <AddTestQuestion />}

          <div className={styles.addNote__buttons}>
            <button className={styles.addNote__confirm} type="submit">
              Опубликовать
            </button>
            {!isToggleNav ? (
              <button
                type="button"
                className={styles.addNote__confirm}
                onClick={handlerAddQuestion}
              >
                Добавить вопрос
              </button>
            ) : null}
            <button
              type="button"
              className={styles.addNote__cancel}
              onClick={handlerCancelQuestion}
            >
              Отмена
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTest;
