import { useEffect } from "react";
import styles from "styles/Tests.module.scss";

import { Test, Categories, SortPopup, EmptyBlock } from "components";

import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { fetchCategory, fetchTests } from "@redux/slices";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";

const Tests = () => {
  const { tests, status } = useAppSelector((state) => state.tests);
  const { pathname } = useRouter();
  const dispatch = useAppDispatch();

  const isTestsLoading = status === "loading";
  const isTestsError = status === "error";

  console.log(tests);

  // useEffect(() => {
  //   if (pathname) {
  //     dispatch(fetchCategory(pathname));
  //   } else {
  //     dispatch(fetchTests());
  //   }
  // }, [pathname]);

  // useEffect(() => {
  //  dispatch(fetchTests())
  // }, []);

  return (
    <section className={styles.notes}>
      <div className={styles.notes__top}>
        <Categories />
        <SortPopup />
      </div>
      <div
      // className={
      //   isTestsLoading
      //     ? [styles.notes__content, styles.notes__contentLoading].join(" ")
      //     : styles.notes__content
      // }
      >
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
