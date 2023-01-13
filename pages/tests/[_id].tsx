import { useEffect } from "react";

import styles from "styles/FullTest.module.scss";

import {
  AnswerBlock,
  InfoPanel,
  ShowScore,
  Comments,
  TopResults,
  AnswerBlockOffer,
  FullTestBlock,
} from "components";
import { ClipLoader } from "react-spinners";
import { RemoveIcon, EditIcon } from "public/icons";

import axios from "utils/axios";

// import { useAppDispatch, useAppSelector } from "@redux/hooks";
// import {
//   fetchTest,
//   onGetCurrentAnswer,
//   setAnswerQuestion,
//   setShowScore,
// } from "@redux/slices";
import { TestProps } from "propTypes";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useAuthStore, useQuizStore } from "store";

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
        {/* <Comments {...test} /> */}
      </div>
    </main>
  );
};

export default FullTest;
