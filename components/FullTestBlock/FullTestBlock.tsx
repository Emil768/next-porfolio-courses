import { AnswerBlock } from "components/AnswerBlock";
import { AnswerBlockOffer } from "components/AnswerBlockOffer";
import { InfoPanel } from "components/InfoPanel";
import { ShowScore } from "components/ShowScore";
import Link from "next/link";

import { AnswerCurrentProps, QuizStateProps, TestProps } from "propTypes";
import { EditIcon, RemoveIcon } from "public/icons";
import { useState } from "react";
import styles from "./FullTestBlock.module.scss";

export const FullTestBlock = ({ test }: { test: TestProps }) => {
  const { _id, title, ques } = test;

  const [quiz, setQuiz] = useState<QuizStateProps>({
    currentAnswer: { index: 0, answer: "" },
    currentQuesIndex: 0,
    score: 0,
    showScore: false,
  });

  const currentQues = ques[quiz.currentQuesIndex];

  const isCurrentAnswer =
    quiz.currentAnswer.index !== null && quiz.currentAnswer.answer !== "";

  // const isEditable = user?._id === test.user?._id;

  const handlerNextQuiestion = () => {
    if (isCurrentAnswer) {
      const nextQuestion = quiz.currentQuesIndex + 1;
      if (nextQuestion <= ques.length) {
        setAnswerQuestion();
        if (nextQuestion === ques.length) {
          setQuiz({ ...quiz, showScore: true });
        }
      }
    }
  };

  const handlerCurrentAnswer = ({ index, answer }: AnswerCurrentProps) => {
    setQuiz({ ...quiz, currentAnswer: { index, answer } });
  };

  const setAnswerQuestion = () => {
    const currentAnswerQuestion = ques[quiz.currentQuesIndex];
    setQuiz({
      ...quiz,
      score: (quiz.score += quiz.currentAnswer.answer!
        ? currentAnswerQuestion.answers[quiz.currentAnswer.index!].answer
            .replace(/\s/g, "")
            .toLowerCase() ===
          quiz.currentAnswer.answer!.replace(/\s/g, "").toLowerCase()
          ? 1
          : 0
        : currentAnswerQuestion.answers[quiz.currentAnswer.index!].correct
        ? 1
        : 0),
      currentQuesIndex: quiz.currentQuesIndex + 1,
      currentAnswer: { index: null },
    });
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

      <div className={styles.fullTest__editable}>
        <Link href={`/edit/${_id}`}>
          <EditIcon width={20} />
        </Link>
        <RemoveIcon width={20} />
      </div>

      <InfoPanel {...test} />
      {quiz.showScore ? (
        <ShowScore {...test} totalScore={quiz.score} />
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
              <span>{0 + 1}.</span> {currentQues.title}
            </div>
            <div className={styles.answers}>
              {currentQues.answers.map((item, index) =>
                currentQues.typeQuestion === "test" ? (
                  <AnswerBlock
                    {...item}
                    key={item._id}
                    keyIndex={index}
                    onGetCurrentAnswer={handlerCurrentAnswer}
                  />
                ) : (
                  <AnswerBlockOffer
                    key={item._id}
                    keyIndex={index}
                    onGetCurrentAnswer={handlerCurrentAnswer}
                  />
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
