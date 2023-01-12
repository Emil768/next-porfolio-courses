import styles from "./ShowScore.module.scss";

import { ResultList, ProgressProvider, ScoreBlock } from "components";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TestProps } from "propTypes";
import { useEffect } from "react";
import axios from "axios";
// import { useParams } from "react-router-dom";

interface ShowScoreProps extends TestProps {
  totalScore: number;
}

export const ShowScore = ({ ques, totalScore }: ShowScoreProps) => {
  // const { id } = useParams();
  // const { data } = useAppSelector((state) => state.auth);
  const resultScore = Math.round((totalScore / ques.length) * 100);

  console.log(resultScore);

  // useEffect(() => {
  //   if (data) {
  //     axios.post(`/getScore/${id}`, { totalScore: resultScore });
  //   }
  // }, []);

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
