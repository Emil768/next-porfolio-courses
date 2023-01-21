import styles from "styles/Tests.module.scss";

import { Test, Categories, SortPopup, EmptyBlock } from "components";

import { GetServerSideProps } from "next/types";

import axios from "utils/axios";

import { TestProps } from "propTypes";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    if (context.query.sort) {
      const { data } = await axios.get(`/sort/${context.query.sort}`);

      return {
        props: { tests: data },
      };
    }

    const { data } = await axios.get<TestProps[]>("/tests");
    return {
      props: { tests: data },
    };
  } catch (err) {
    return {
      props: { tests: [] },
    };
  }
};

const Tests = ({ tests }: { tests: TestProps[] }) => {
  const [isLoading, setIsLoadig] = useState(false);

  const onToggleLoading = () => setIsLoadig(true);

  useEffect(() => {
    setIsLoadig(false);
  }, [tests]);
  return (
    <section className={styles.notes}>
      <Head>
        <title>Пройти тесты по английскому</title>
        <meta
          name="description"
          content="Пройти тесты по английскому языку для детей и взрослых. Создавай и оценивай тесты. Соревнуйся с другими пользователями!"
        />
        <meta property="og:title" content="Пройти тесты по английскому" />
        <meta
          property="og:description"
          content="Пройти тесты по английскому языку для детей и взрослых. Создавай и оценивай тесты. Соревнуйся с другими пользователями!"
        />
        <meta
          property="og:image"
          content={
            "https://res.cloudinary.com/dl4ooiriz/image/upload/v1672837860/checklists_cover_m1f4zm.png"
          }
        />
        <meta property="og:type" content="website" />
      </Head>
      <div className={styles.notes__top}>
        <Categories />
        <SortPopup />
      </div>
      <div
        className={
          isLoading
            ? [styles.notes__content, styles.notes__contentLoading].join(" ")
            : styles.notes__content
        }
      >
        {isLoading ? (
          <ClipLoader loading={isLoading} color="#39ca81" />
        ) : tests.length !== 0 ? (
          tests.map((item) => (
            <Test test={item} key={item._id} setLoading={onToggleLoading} />
          ))
        ) : (
          <EmptyBlock
            title={"Кажется что-то пошло не так..."}
            text={"Повторите попытку позже."}
          />
        )}
      </div>
    </section>
  );
};

export default Tests;
