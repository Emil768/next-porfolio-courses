import styles from "styles/FullTest.module.scss";
import { Comments, TopResults, FullTestBlock } from "components";

import axios from "utils/axios";
import { TestProps } from "propTypes";
import { GetServerSideProps } from "next";
import Head from "next/head";

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
      <Head>
        <title>{`${test.title} - Extra school`}</title>
        <meta name="description" content={`${test.text}`} />
        <meta property="og:title" content={`${test.title} - Extra school`} />
        <meta property="og:description" content={`${test.text}`} />
        <meta
          property="og:image"
          content={
            "https://res.cloudinary.com/dl4ooiriz/image/upload/v1672837860/checklists_cover_m1f4zm.png"
          }
        />
        <meta property="og:type" content="article" />
      </Head>

      {Object.keys(test).length !== 0 ? (
        <>
          <FullTestBlock test={test} />
          <div className={styles.fullTest__info}>
            {test.score.length !== 0 && <TopResults testId={test._id} />}
            <Comments {...test} />
          </div>
        </>
      ) : (
        <div>Error...</div>
      )}
    </main>
  );
};

export default FullTest;
