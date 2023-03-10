import styles from "./ShowScore.module.scss";

import useSwr from "swr";
import { ResultList, ProgressProvider, ScoreBlock } from "components";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TestProps } from "propTypes";

import axios from "utils/axios";
import useAuthStore from "store/auth";

interface ShowScoreProps extends TestProps {
  totalScore: number;
}

export const ShowScore = ({ _id, ques, totalScore }: ShowScoreProps) => {
  const { data } = useAuthStore();

  const resultScore = Math.round((totalScore / ques.length) * 100);

  const fetcher = async () => {
    if (data) {
      const { data } = await axios.post(`/getScore/${_id}`, {
        totalScore: resultScore,
      });
      return data;
    }
  };

  const {} = useSwr("getScoreUser", fetcher);

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
        <ScoreBlock {...item} key={item._id} indexId={index} />
      ))}
    </div>
  );
};
