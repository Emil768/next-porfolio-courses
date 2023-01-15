import styles from "styles/FullTest.module.scss";
import { Comments, TopResults, FullTestBlock } from "components";

import axios from "utils/axios";
import { TestProps } from "propTypes";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { _id } = context.params!;
    const { data } = await axios.get<TestProps>(`/tests/${_id}`);

    return {
      props: { test: data },
    };
  } catch (err) {
    return {
      props: { test: {} as TestProps },
    };
  }
};

const FullTest = ({ test }: { test: TestProps }) => {
  return (
    <main className={styles.fullTest}>
      {Object.keys(test).length !== 0 ? (
        <>
          <FullTestBlock test={test} />
          <div className={styles.fullTest__info}>
            <TopResults testId={test._id} />
            <Comments />
          </div>
        </>
      ) : (
        <div>Error...</div>
      )}
    </main>
  );
};

export default FullTest;
