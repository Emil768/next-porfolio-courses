import { useEffect } from "react";

import styles from "./FullTest.module.scss";

import {
  AnswerBlock,
  InfoPanel,
  ShowScore,
  Comments,
  TopResults,
  AnswerBlockOffer,
} from "@components";
import { ClipLoader } from "react-spinners";
import { RemoveIcon, EditIcon } from "public/icons";

import axios from "@axios";

import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  fetchTest,
  onGetCurrentAnswer,
  setAnswerQuestion,
  setShowScore,
} from "@redux/slices";
import { TestProps } from "@proptypes";
import Link from "next/link";

export const FullTest = () => {
  // const { id } = useParams();
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.auth);
  const { quiz, status, currentQuesIndex, currentAnswer, showScore, score } =
    useAppSelector((state) => state.quiz);

  const currentQuiz = Object.keys(quiz).length !== 0 ? quiz : ({} as TestProps);
  const currentQues = currentQuiz.ques && currentQuiz.ques[currentQuesIndex];
  const isCurrentAnswer =
    currentAnswer.index !== null && currentAnswer.answer !== "";

  const isLoading = Boolean(status === "loading");
  const isEditable = data?._id === quiz.user?._id;

  // useEffect(() => {
  //   dispatch(fetchTest(id!));
  // }, [id]);

  const handlerNextQuiestion = () => {
    if (isCurrentAnswer) {
      const nextQuestion = currentQuesIndex + 1;
      if (nextQuestion <= quiz.ques.length) {
        dispatch(setAnswerQuestion(currentAnswer));
        dispatch(onGetCurrentAnswer({ index: null }));
        if (nextQuestion === quiz.ques.length) {
          dispatch(setShowScore());
        }
      }
    }
  };

  // const onRemoveTest = async () => {
  //   if (window.confirm("Вы действительно хотите удалить тест?")) {
  //     await axios.delete(`/tests/${id}`);
  //     navigate("/");
  //   }
  // };

  return (
    <main className={styles.fullTest} data-testid="FullTest">
      <div className={styles.fullTest__content}>
        {isLoading ? (
          <ClipLoader
            loading={isLoading}
            color="#39ca81"
            className={styles.spinner}
          />
        ) : (
          <>
            <h1 className={styles.fullTest__title}>{quiz.title}</h1>
            {isEditable && (
              <div className={styles.fullTest__editable}>
                {/* <Link href={`/edit/${id}`}>
                  <EditIcon width={20} />
                </Link>
                <RemoveIcon width={20} onClick={onRemoveTest} /> */}
              </div>
            )}
            <InfoPanel {...quiz} />
            {showScore ? (
              <ShowScore {...quiz} totalScore={score} />
            ) : (
              <>
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
                      {/* {currentQues.answers.map((item, index) =>
                        currentQues.typeQuestion === "test" ? (
                          <AnswerBlock
                            {...item}
                            key={item._id}
                            keyIndex={index}
                          />
                        ) : (
                          <AnswerBlockOffer key={item._id} keyIndex={index} />
                        )
                      )} */}
                    </div>
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
              </>
            )}
          </>
        )}
      </div>
      <div className={styles.fullTest__info}>
        <TopResults />
        <Comments {...quiz} />
      </div>
    </main>
  );
};
