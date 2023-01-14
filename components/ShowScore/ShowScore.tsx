import styles from "./ShowScore.module.scss";

import useSwr from "swr";
import { ResultList, ProgressProvider, ScoreBlock } from "components";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TestProps, UserProps } from "propTypes";
import { useEffect } from "react";
import axios from "utils/axios";
import useAuthStore from "store/auth";

interface ShowScoreProps extends TestProps {
  totalScore: number;
}

export const ShowScore = ({ _id, ques, totalScore }: ShowScoreProps) => {
  const { user } = useAuthStore();

  const resultScore = Math.round((totalScore / ques.length) * 100);

  const fetcher = async () => {
    if (user) {
      const { data } = await axios.post(`/getScore/${_id}`, {
        totalScore: resultScore,
      });
      return data;
    }
  };

  const { data, error, isLoading } = useSwr("getScoreUser", fetcher);

  return (
    <div className={styles.score}>
      <div className={styles.score__statistics}>
        <div className={styles.score__progressbar}>
          <ProgressProvider valueStart={0} valueEnd={resultScore}>
            {(value: number) => (
              <CircularProgressbar value={value} text={`${resultScore}%`} />
            )}
          </ProgressProvider>
        </div>
        <ResultList score={totalScore} ques={ques} />
      </div>
      {ques.map((item, index) => (
        <ScoreBlock {...item} key={index} id={index} />
      ))}
    </div>
  );
};
