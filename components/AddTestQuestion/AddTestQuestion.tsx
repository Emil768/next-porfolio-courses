import { QuestionBlock } from "components";
import styles from "./AddTestQuestion.module.scss";

import { ArrowIcon } from "public/icons";
import useTestStore from "store/test";

export const AddTestQuestion = () => {
  const { data, setNextQuestion, setPrevQuestion, currentQuestionIndex } =
    useTestStore();

  const handlerNextQuestion = () =>
    currentQuestionIndex !== data.questions.length ? setNextQuestion() : null;

  const handlerPrevQuestion = () =>
    currentQuestionIndex !== 1 ? setPrevQuestion() : null;

  return (
    <div className={styles.addNote__tests} data-testid="AddTestQuestion">
      <div
        className={
          data.questions.length > 1
            ? [styles.addNote__arrow, styles.addNote__left].join(" ")
            : styles.addNote__arrowHide
        }
        onClick={handlerPrevQuestion}
      >
        <ArrowIcon />
      </div>
      {data.questions.map((item, index) => {
        return (
          <div
            className={
              currentQuestionIndex === index + 1
                ? styles.addNote__questionActive
                : styles.addNote__questionBlock
            }
            key={index}
          >
            <QuestionBlock {...item} id={index} />
          </div>
        );
      })}
      <div
        className={
          data.questions.length > 1
            ? [styles.addNote__arrow, styles.addNote__right].join(" ")
            : styles.addNote__arrowHide
        }
        onClick={handlerNextQuestion}
      >
        <ArrowIcon />
      </div>
    </div>
  );
};
