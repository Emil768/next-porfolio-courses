import axios from "utils/axios";

import useSwr from "swr";
import { useEffect, useState } from "react";
import styles from "./TopResults.module.scss";
// import { Link, useParams } from "react-router-dom";
import { ScoreProps } from "propTypes";
import Link from "next/link";
import { GetStaticProps } from "next";
import { ClipLoader } from "react-spinners";

export const TopResults = ({ id }: { id: string }) => {
  const fetcher = async () => {
    const { data } = await axios.get<ScoreProps[]>(`/getTopScore/${id}`);
    return data;
  };

  const { data, error } = useSwr("getScore", fetcher);

  if (error) return <div>Error...</div>;
  if (!data) return <ClipLoader loading={data} color="#39ca81" />;

  console.log(data);
  return (
    <div className={styles.topResults} data-testid="TopResults">
      {data.length ? (
        <div className={styles.topResults__content}>
          <h3 className={styles.topResults__title}>Топ прохождений🔥</h3>
          <div className={styles.topResulst__chart}>
            {data.slice(-3).map((item) => (
              <ul className={styles.topResults__list} key={item._id}>
                <li className={styles.topResults__item}>
                  <div className={styles.topResults__user}>
                    <img src={item.scoreBy.avatarUrl.url} alt="avatar" />
                    <Link
                      className={styles.topResults__link}
                      href={`/user/${item.scoreBy._id}`}
                    >
                      {item.scoreBy.fullName}
                    </Link>
                  </div>
                  <span className={styles.topResults__score}>
                    {item.totalScore} %
                  </span>
                </li>
              </ul>
            ))}
          </div>
        </div>
      ) : (
        <ClipLoader loading={data} color="#39ca81" />
      )}
    </div>
  );
};
