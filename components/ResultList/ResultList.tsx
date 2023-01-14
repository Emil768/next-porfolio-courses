// import { useAppSelector } from "redux/hooks";
import { QuesProps } from "propTypes";
import { testResult } from "utils";
import styles from "./ResultList.module.scss";

export const ResultList = ({
  score,
  ques,
}: {
  score: number;
  ques: QuesProps[];
}) => {
  const totalResult = testResult(ques);
  const resultEmoji = score === totalResult ? "👏" : " 🤞";

  return (
    <div className={styles.score__result}>
      <h2 className={styles.score__resultTitle}>Результат {resultEmoji}</h2>
      <div className={styles.score__lists}>
        <ul className={styles.score__resultList}>
          <li className={styles.score__resultItem}>
            <span className={styles.score__text}>Количество баллов</span>
            <span className={styles.score__number}>{score}</span>
          </li>
          <li className={styles.score__resultItem}>
            <span className={styles.score__text}>
              Максимальное количество баллов
            </span>
            <span className={styles.score__number}>{totalResult}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
