import axios from "utils/axios";
import { useRouter } from "next/dist/client/router";
import { createContext, useEffect, useState } from "react";
import { AddTestContextType, MainAddTestProps, TestProps } from "propTypes";

import styles from "styles/AddTest.module.scss";

import Link from "next/link";
import { AddTestMain, AddTestQuestion } from "components";

export const TestContext = createContext<AddTestContextType | null>(null);

const newTest = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isToggleNav, setIsToggleNav] = useState(true);
  const [data, setData] = useState<MainAddTestProps>({
    title: "",
    category: { label: "", value: "" },
    bgImage: { public_id: "", url: "" },
    text: "",
    questions: [
      {
        title: "",
        imageURL: { public_id: "", url: "" },
        answers: [
          { answer: "", correct: false },
          { answer: "", correct: false },
          { answer: "", correct: false },
        ],
        typeQuestion: "test",
      },
    ],
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<TestProps>(`/tests/${id}`);

      setData({
        title: data.title,
        text: data.text,
        category: data.category,
        bgImage: data.backgroundImage,
        questions: data.ques,
      });
    };

    if (id) {
      fetchData();
    }
  }, [id]);

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

      router.push(`/tests/${id}`);
    } catch (err) {
      alert("Не удалось создать тест");
    }
  };

  const handlerAddQuestion = () => {
    setData({
      ...data,
      questions: [
        ...data.questions,
        {
          title: "",
          imageURL: { public_id: "", url: "" },
          answers: [
            { answer: "", correct: false },
            { answer: "", correct: false },
            { answer: "", correct: false },
          ],
          typeQuestion: "test",
        },
      ],
    });
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const onGetMainProps = ({
    title,
    text,
    category,
    bgImage,
    questions,
  }: MainAddTestProps) =>
    setData({
      title,
      text,
      category,
      bgImage,
      questions,
    });

  console.log(data);

  return (
    <form className={styles.addNote} onSubmit={onSubmit}>
      <div className={styles.addNote__content}>
        <div className={styles.addNote__top}>
          <ul className={styles.addNote__list}>
            <li
              className={
                isToggleNav
                  ? [styles.addNote__item, styles.addNote__itemActive].join(" ")
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
                  : [styles.addNote__item, styles.addNote__itemActive].join(" ")
              }
              onClick={() => setIsToggleNav(false)}
            >
              Вопросы
            </li>
          </ul>
        </div>

        {Object.keys(data).length !== 0 && (
          <TestContext.Provider
            value={{
              data,
              currentQuestionIndex,
              setCurrentQuestionIndex,
              onGetMainProps,
            }}
          >
            {isToggleNav ? <AddTestMain /> : <AddTestQuestion />}
          </TestContext.Provider>
        )}

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
          <Link href={"/"} className={styles.addNote__cancel}>
            Отмена
          </Link>
        </div>
      </div>
    </form>
  );
};

export default newTest;
