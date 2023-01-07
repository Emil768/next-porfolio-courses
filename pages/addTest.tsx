import { useState, createContext, useEffect } from "react";
// import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import styles from "../styles/AddTest.module.scss";

import { AddTestContextType, MainAddTestProps, TestProps } from "propTypes";

import { useAppSelector } from "@redux/hooks";
import { AddTestMain, AddTestQuestion } from "components";

import axios from "axios";

export const TestContext = createContext<AddTestContextType | null>(null);

export const AddTest = () => {
  // const { id } = useParams();
  // const navigate = useNavigate();

  // const isEditable = Boolean(id);
  const isAuth = useAppSelector((state) => Boolean(state.auth.data));

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

  // useEffect(() => {
  //   if (id) {
  //     axios.get(`/tests/${id}`).then(({ data }: { data: TestProps }) => {
  //       setData({
  //         title: data.title,
  //         text: data.text,
  //         category: data.category,
  //         bgImage: data.backgroundImage,
  //         questions: data.ques,
  //       });
  //     });
  //   }
  // }, [id]);

  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const fields = {
  //     title: data.title,
  //     text: data.text,
  //     category: data.category,
  //     backgroundImage: data.bgImage,
  //     ques: data.questions,
  //   };

  //   try {
  //     const { data } = isEditable
  //       ? await axios.patch(`/tests/${id}`, fields)
  //       : await axios.post("/tests", fields);

  //     const _id = isEditable ? id : data._id;

  //     navigate(`/tests/${_id}`);
  //   } catch (err) {
  //     alert("Не удалось создать тест");
  //   }
  // };

  // const handlerAddQuestion = () => {
  //   setData({
  //     ...data,
  //     questions: [
  //       ...data.questions,
  //       {
  //         title: "",
  //         imageURL: { public_id: "", url: "" },
  //         answers: [
  //           { answer: "", correct: false },
  //           { answer: "", correct: false },
  //           { answer: "", correct: false },
  //         ],
  //         typeQuestion: "test",
  //       },
  //     ],
  //   });
  //   setCurrentQuestionIndex(currentQuestionIndex + 1);
  // };

  // const onGetMainProps = ({
  //   title,
  //   text,
  //   category,
  //   bgImage,
  //   questions,
  // }: MainAddTestProps) =>
  //   setData({
  //     title,
  //     text,
  //     category,
  //     bgImage,
  //     questions,
  //   });

  // if (!window.localStorage.getItem("token") && !isAuth) {
  //   return <Navigate to={"/"} />;
  // }

  return (
    <form className={styles.addNote}>
      {/* <div className={styles.addNote__content}>
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

        <div className={styles.addNote__buttons}>
          <button className={styles.addNote__confirm} type="submit">
            {isEditable ? "Сохранить" : "Опубликовать"}
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
          <Link
            to={isEditable ? `/tests/${id}` : "/"}
            className={styles.addNote__cancel}
          >
            Отмена
          </Link>
        </div>
      </div> */}
    </form>
  );
};
