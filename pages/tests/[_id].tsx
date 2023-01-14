import styles from "styles/FullTest.module.scss";
import { Comments, TopResults, FullTestBlock } from "components";

import axios from "utils/axios";
import { TestProps } from "propTypes";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { _id } = context.params!;
  const { data } = await axios.get<TestProps>(`/tests/${_id}`);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { test: data },
  };
};

const FullTest = ({ test }: { test: TestProps }) => {
  return (
    <main className={styles.fullTest}>
      <FullTestBlock test={test} />
      <div className={styles.fullTest__info}>
        <TopResults id={test._id} />
        <Comments />
      </div>
    </main>
  );
};

export default FullTest;
