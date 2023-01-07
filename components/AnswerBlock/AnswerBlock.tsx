import { AnswerBlockProps } from "propTypes";
import { onGetCurrentAnswer } from "@redux/slices";
import { useDispatch } from "react-redux";
import styles from "./AnswerBlock.module.scss";

export const AnswerBlock = ({ answer, _id, keyIndex }: AnswerBlockProps) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.answers__block}>
      <input
        type="radio"
        name="answer"
        id={`q${_id}-option`}
        key={_id}
        onChange={() => dispatch(onGetCurrentAnswer({ index: keyIndex }))}
      />
      <label htmlFor={`q${_id}-option`}>{answer}</label>
    </div>
  );
};
