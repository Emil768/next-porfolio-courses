import styles from "styles/Tests.module.scss";

import { Test, Categories, SortPopup, EmptyBlock } from "components";

import { GetServerSideProps } from "next/types";

import axios from "utils/axios";
import { TestProps } from "propTypes";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
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
  return (
    <section className={styles.notes}>
      <div className={styles.notes__top}>
        <Categories />
        <SortPopup />
      </div>
      <div className={styles.notes__content}>
        {tests.length !== 0 ? (
          tests.map((item) => <Test {...item} key={item._id} />)
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
