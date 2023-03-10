import { AnswerBlockProps } from "propTypes";
import useQuizStore from "store/quiz";

import styles from "./AnswerBlock.module.scss";

export const AnswerBlock = ({ answer, _id, keyIndex }: AnswerBlockProps) => {
  const { onGetCurrentAnswer } = useQuizStore();
  const onChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) =>
    onGetCurrentAnswer({ index: keyIndex });
  return (
    <div className={styles.answers__block}>
      <input
        type="radio"
        name="answer"
        id={`q${_id}-option`}
        key={_id}
        onChange={onChangeAnswer}
      />
      <label htmlFor={`q${_id}-option`}>{answer}</label>
    </div>
  );
};
