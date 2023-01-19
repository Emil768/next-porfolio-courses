import {
  AnswerBlock,
  AnswerBlockOffer,
  InfoPanel,
  ShowScore,
} from "components";

import Link from "next/link";

import { TestProps } from "propTypes";
import { EditIcon, RemoveIcon } from "public/icons";
import { useEffect } from "react";
import styles from "./FullTestBlock.module.scss";
import useAuthStore from "store/auth";
import useQuizStore from "store/quiz";
import axios from "utils/axios";
import { useRouter } from "next/router";
import Image from "next/legacy/image";

export const FullTestBlock = ({ test }: { test: TestProps }) => {
  const router = useRouter();
  const { data } = useAuthStore();
  const {
    fetchTest,
    currentAnswer,
    currentQuesIndex,
    setShowScore,
    setAnswerQuestion,
    onGetCurrentAnswer,
    showScore,
    score,
  } = useQuizStore();

  useEffect(() => {
    fetchTest(test);
  }, [test]);

  const isEditable = data?._id === test.user?._id;
  const currentQues = test && test.ques[currentQuesIndex];

  // console.log(currentQues, currentQuesIndex);

  const isCurrentAnswer =
    currentAnswer.index !== null && currentAnswer.answer !== "";

  const handlerNextQuiestion = () => {
    if (isCurrentAnswer) {
      const nextQuestion = currentQuesIndex + 1;
      if (nextQuestion <= test.ques.length) {
        setAnswerQuestion(currentAnswer);
        onGetCurrentAnswer({ index: null });
        if (nextQuestion === test.ques.length) {
          setShowScore();
        }
      }
    }
  };

  const onRemoveTest = async () => {
    if (window.confirm("Вы действительно хотите удалить тест?")) {
      await axios.delete(`/tests/${test._id}`);
      router.push("/tests");
    }
  };

  return (
    <div className={styles.fullTest__content}>
      <h1 className={styles.fullTest__title}>{test.title}</h1>

      {isEditable && (
        <div className={styles.fullTest__editable}>
          <Link href={`/addTest/${test._id}`}>
            <EditIcon width={20} />
          </Link>
          <RemoveIcon width={20} onClick={onRemoveTest} />
        </div>
      )}

      <InfoPanel {...test} />
      {showScore ? (
        <ShowScore {...test} totalScore={score} />
      ) : (
        <div className={styles.questions}>
          {currentQues.imageURL?.url ? (
            <div className={styles.questions__image}>
              <Image
                width={700}
                height={300}
                layout="responsive"
                src={currentQues.imageURL?.url}
                alt="question background"
              />
            </div>
          ) : null}
          <div
            className={
              currentQues.imageURL?.url
                ? styles.questions__info
                : styles.questions__infoFull
            }
          >
            <div className={styles.questions__title}>
              <span>{currentQuesIndex + 1}.</span> {currentQues.title}
            </div>
            <div className={styles.answers}>
              {currentQues.answers.map((item, index) =>
                currentQues.typeQuestion === "test" ? (
                  <AnswerBlock {...item} key={item._id} keyIndex={index} />
                ) : (
                  <AnswerBlockOffer key={item._id} keyIndex={index} />
                )
              )}
            </div>
          </div>
          <div className={styles.questions__buttons}>
            <div
              className={styles.fullTest__button}
              onClick={handlerNextQuiestion}
            >
              Далее
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
