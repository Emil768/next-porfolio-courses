import { useEffect, useState } from "react";
import styles from "styles/Tests.module.scss";

import { Test, Categories, SortPopup, EmptyBlock } from "components";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { fetchCategory, fetchTests } from "redux/slices";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";
import { GetServerSideProps, GetStaticProps } from "next/types";
import { wrapper } from "redux/store";
import axios from "utils/axios";
import { TestProps } from "propTypes";

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get<TestProps[]>("/tests");

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { tests: data },
  };
};

const Tests = ({ tests }: { tests: TestProps[] }) => {
  // const { tests, status } = useAppSelector((state) => state.tests);
  const { pathname } = useRouter();
  // const dispatch = useAppDispatch();

  // const isTestsLoading = status === "loading";
  // const isTestsError = status === "error";

  // useEffect(() => {
  //   if (pathname) {
  //     dispatch(fetchCategory(pathname));
  //   } else {
  //     dispatch(fetchTests());
  //   }
  // }, [pathname]);

  return (
    <section className={styles.notes}>
      <div className={styles.notes__top}>
        <Categories />
        <SortPopup />
      </div>
      <div
        className={
          styles.notes__content
          // isTestsLoading
          //   ? [styles.notes__content, styles.notes__contentLoading].join(" ")
          //   : styles.notes__content
        }
      >
        {tests && tests.map((item) => <Test {...item} key={item._id} />)}
        {/* {!isTestsError ? (
          isTestsLoading ? (
            <ClipLoader loading={isTestsLoading} color="#39ca81" />
          ) : tests.length !== 0 ? (
            tests.map((item) => <Test {...item} key={item._id} />)
          ) : (
            <EmptyBlock
              title={"Похоже сейчас нету активных тестов"}
              text={""}
            />
          )
        ) : (
          <EmptyBlock
            title={"Кажется что-то пошло не так"}
            text={"Повторите попытку позже."}
          />
        )} */}
      </div>
    </section>
  );
};

export default Tests;
