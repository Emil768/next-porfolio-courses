import styles from "./AnswerInfo.module.scss";
import ReactSwitch from "react-switch";
import { CloseIcon } from "public/icons";
import { QuesLessProps } from "propTypes";
import useTestStore from "store/test";

interface AnswerInfoProps {
  id: number;
  idQuestion: number;
}

export const AnswerInfo = ({ id, idQuestion }: AnswerInfoProps) => {
  const { data, onGetProps } = useTestStore();
  const currentAnswer = data.questions[idQuestion].answers[id];

  const onChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    onGetProps({
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
    onGetProps({
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
    onGetProps({
      ...data,
      questions: data.questions.map((item, index): QuesLessProps => {
        if (index === idQuestion) {
          if (id !== 0) {
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
      }),
    });
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
