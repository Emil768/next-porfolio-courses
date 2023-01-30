import axios from "utils/axios";
import { useRouter } from "next/dist/client/router";
import { createContext, useEffect, useState } from "react";
import { AddTestContextType, TestProps } from "propTypes";

import styles from "styles/AddTest.module.scss";

import Link from "next/link";
import { AddTestMain, AddTestQuestion } from "components";
import useTestStore from "store/test";
import useAuthStore from "store/auth";
import Head from "next/head";

export const TestContext = createContext<AddTestContextType | null>(null);

const ChangeTest = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isToggleNav, setIsToggleNav] = useState(true);

  const { data, onGetProps, addQuestion, clearState } = useTestStore();
  const user = useAuthStore((state) => state.data);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<TestProps>(`/tests/${id}`);

      onGetProps({
        title: data.title,
        text: data.text,
        category: data.category,
        bgImage: data.backgroundImage,
        questions: data.ques,
      });
    };

    if (id && user?.role === "admin") {
      fetchData();
    } else {
      router.push("/");
    }
  }, [id, user]);

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
      const { data } = await axios.patch(`/tests/${id}`, fields);
      clearState();
      router.push(`/tests/${id}`);
    } catch (err) {
      alert("Не удалось создать тест");
    }
  };

  const handlerAddQuestion = () => addQuestion();

  return (
    <>
      <Head>
        <title>Обновить тест - Extra school</title>
        <meta property="og:title" content="Обновить тест - Extra school" />
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

          {Object.keys(data).length !== 0 &&
            (isToggleNav ? <AddTestMain /> : <AddTestQuestion />)}

          <div className={styles.addNote__buttons}>
            <button className={styles.addNote__confirm} type="submit">
              Сохранить
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
            <Link href={`/tests/${id}`} className={styles.addNote__cancel}>
              Отмена
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default ChangeTest;
