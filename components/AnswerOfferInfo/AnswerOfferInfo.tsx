import { useContext } from "react";
import { AddTestContextType, QuesLessProps } from "propTypes";
import styles from "./AnswerOfferInfo.module.scss";
import { TestContext } from "pages/addTest";

interface AnswerOfferInfoProps {
  id: number;
  idQuestion: number;
}

export const AnswerOfferInfo = ({ id, idQuestion }: AnswerOfferInfoProps) => {
  const { data, onGetMainProps } = useContext(
    TestContext
  ) as AddTestContextType;

  const currentAnswer = data.questions[idQuestion].answers[id];

  const onChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextState = data.questions.map((item, index): QuesLessProps => {
      if (index === idQuestion) {
        if (item.answers[id]) {
          item.answers[id] = {
            answer: e.target.value,
            correct: true,
          };
          return {
            title: item.title,
            imageURL: item.imageURL,
            answers: [...item.answers],
            typeQuestion: "offer",
          };
        }
      }
      return item;
    });

    onGetMainProps({ ...data, questions: nextState });
  };

  return (
    <input
      type="text"
      className={styles.answer}
      placeholder="Введите правильный ответ"
      onChange={onChangeAnswer}
      defaultValue={currentAnswer.answer}
    />
  );
};
