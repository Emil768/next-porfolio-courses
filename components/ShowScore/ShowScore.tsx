import styles from "./ShowScore.module.scss";

import useSwr from "swr";
import { ResultList, ProgressProvider, ScoreBlock } from "components";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TestProps, UserProps } from "propTypes";
import { useEffect } from "react";
import axios from "utils/axios";
import { useAuthStore } from "store";
// import { useParams } from "react-router-dom";

interface ShowScoreProps extends TestProps {
  totalScore: number;
}

export const ShowScore = ({ _id, ques, totalScore }: ShowScoreProps) => {
  const fetcher = async () => {
    const { data } = await axios.post(`/getScore/${_id}`, {
      totalScore: resultScore,
    });
    return data;
  };

  const resultScore = Math.round((totalScore / ques.length) * 100);
  const { data, error } = useSwr("getScore", fetcher);

  if (error) return <div>Error...</div>;
  if (!data) return <div>Sad request..</div>;

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
        <ResultList />
      </div>
      {ques.map((item, index) => (
        <ScoreBlock {...item} key={index} id={index} />
      ))}
    </div>
  );
};
