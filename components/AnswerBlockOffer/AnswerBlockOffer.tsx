import styles from "./AnswerBlockOffer.module.scss";

import debounce from "lodash.debounce";
import { AnswerCurrentProps } from "propTypes";

export const AnswerBlockOffer = ({
  keyIndex,
  onGetCurrentAnswer,
}: {
  keyIndex: number;
  onGetCurrentAnswer: ({ index, answer }: AnswerCurrentProps) => void;
}) => {
  const onGetAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onGetCurrentAnswer({ index: keyIndex, answer: e.target.value });

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
