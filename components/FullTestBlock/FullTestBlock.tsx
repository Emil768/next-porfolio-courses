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

export const FullTestBlock = ({ test }: { test: TestProps }) => {
  const { _id, title, ques } = test;
  const { user } = useAuthStore();
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

  const isEditable = user?._id === test.user?._id;
  const currentQues = ques[currentQuesIndex];

  const isCurrentAnswer =
    currentAnswer.index !== null && currentAnswer.answer !== "";

  const handlerNextQuiestion = () => {
    if (isCurrentAnswer) {
      const nextQuestion = currentQuesIndex + 1;
      if (nextQuestion <= ques.length) {
        setAnswerQuestion(currentAnswer);
        onGetCurrentAnswer({ index: null });
        if (nextQuestion === ques.length) {
          setShowScore();
        }
      }
    }
  };

  // const onRemoveTest = async () => {
  //   if (window.confirm("Вы действительно хотите удалить тест?")) {
  //     await axios.delete(`/tests/${currentQuiz._id}`);
  //     // navigate("/");
  //   }
  // };

  return (
    <div className={styles.fullTest__content}>
      <h1 className={styles.fullTest__title}>{title}</h1>

      {isEditable && (
        <div className={styles.fullTest__editable}>
          <Link href={`/edit/${_id}`}>
            <EditIcon width={20} />
          </Link>
          <RemoveIcon width={20} />
        </div>
      )}

      <InfoPanel {...test} />
      {showScore ? (
        <ShowScore {...test} totalScore={score} />
      ) : (
        <div className={styles.questions}>
          {currentQues.imageURL?.url ? (
            <div className={styles.questions__image}>
              <img src={currentQues.imageURL?.url} alt="" />
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
