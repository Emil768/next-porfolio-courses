import styles from "./AnswerBlockOffer.module.scss";
import { onGetCurrentAnswer } from "@redux/slices";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

export const AnswerBlockOffer = ({ keyIndex }: { keyIndex: number }) => {
  const dispatch = useDispatch();

  const onGetAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    dispatch(onGetCurrentAnswer({ index: keyIndex, answer: e.target.value }));

  const onDebounceOnChange = debounce(onGetAnswer, 200);

  return (
    <div className={styles.answer} data-testid="AnswerBlockOffer">
      <textarea
        className={styles.answer__field}
        onChange={onDebounceOnChange}
        placeholder="Введите предложение"
        name="message"
        cols={30}
        rows={1}
        autoFocus
        required
      />
    </div>
  );
};
