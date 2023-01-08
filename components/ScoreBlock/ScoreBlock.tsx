import styles from "./ScoreBlock.module.scss";
import { ArrowIcon } from "public/icons";
import { QuesProps } from "propTypes";
import { useState } from "react";

interface ScoreBlockProps extends QuesProps {
  id: number;
}

export const ScoreBlock = ({ title, answers, id }: ScoreBlockProps) => {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div>
      <div
        className={styles.score__title}
        onClick={() => setShowAnswer(!showAnswer)}
      >
        <span className={styles.score__text}>
          {id + 1}. {title}
        </span>
        <ArrowIcon
          className={
            showAnswer
              ? [styles.arrow, styles.arrowDrop].join(" ")
              : styles.arrow
          }
        />
      </div>

      <div
        className={showAnswer ? styles.score__answer : styles.score__answerHide}
      >
        {answers.map((item, index) => (
          <div
            key={index}
            className={
              item.correct
                ? [styles.score__answerBlock, styles.score__answerCorrect].join(
                    " "
                  )
                : [
                    styles.score__answerBlock,
                    styles.score__answerNoCorrect,
                  ].join(" ")
            }
          >
            {item.answer}
          </div>
        ))}
      </div>
    </div>
  );
};
