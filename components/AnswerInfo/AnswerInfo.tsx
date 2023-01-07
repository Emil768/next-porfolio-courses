import { useContext } from "react";
import styles from "./AnswerInfo.module.scss";
import ReactSwitch from "react-switch";
import { CloseIcon } from "public/icons";
import { AddTestContextType, QuesLessProps } from "propTypes";
import { TestContext } from "pages/addTest";

interface AnswerInfoProps {
  id: number;
  idQuestion: number;
}

export const AnswerInfo = ({ id, idQuestion }: AnswerInfoProps) => {
  const { data, onGetMainProps } = useContext(
    TestContext
  ) as AddTestContextType;

  const currentAnswer = data.questions[idQuestion].answers[id];
  console.log(currentAnswer);

  const onChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    onGetMainProps({
      ...data,
      questions: data.questions.map(
        (item, index): QuesLessProps =>
          index === idQuestion
            ? item.answers[id] &&
              ((item.answers[id] = {
                answer: e.target.value,
                correct: item.answers[id].correct,
              }),
              {
                title: item.title,
                imageURL: item.imageURL,
                answers: [...item.answers],
                typeQuestion: "test",
              })
            : item
      ),
    });
  };

  const onChangeCorrect = () => {
    onGetMainProps({
      ...data,
      questions: data.questions.map(
        (item, index): QuesLessProps =>
          index === idQuestion
            ? item.answers[id] &&
              ((item.answers[id] = {
                answer: item.answers[id].answer,
                correct: !item.answers[id].correct,
              }),
              {
                title: item.title,
                imageURL: item.imageURL,
                answers: [...item.answers],
                typeQuestion: "test",
              })
            : item
      ),
    });
  };

  const onRemoveAnswer = () => {
    const nextState = data.questions.map((item, index): QuesLessProps => {
      if (index === idQuestion) {
        if (item.answers.length !== 1) {
          item.answers.splice(id, 1);
          return {
            title: item.title,
            imageURL: item.imageURL,
            answers: [...item.answers],
            typeQuestion: "test",
          };
        }
      }

      return item;
    });

    onGetMainProps({ ...data, questions: nextState });
  };

  return (
    <div className={styles.addNote__answers}>
      <input
        type="text"
        name="answer"
        className={styles.addNote__questionsAnswer}
        placeholder="Введите ответ"
        onChange={onChangeAnswer}
        defaultValue={currentAnswer.answer}
        required
      />
      <ReactSwitch onChange={onChangeCorrect} checked={currentAnswer.correct} />
      <CloseIcon
        width={40}
        className={styles.addNote__remove}
        onClick={onRemoveAnswer}
      />
    </div>
  );
};
