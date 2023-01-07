import { useContext, useRef } from "react";

import { AddTestContextType, QuesLessProps } from "@proptypes";
import { AnswerInfo, AnswerOfferInfo } from "@components";

import styles from "./QuestionBlock.module.scss";
import { RemoveIcon } from "public/icons";

import axios from "@axios";
import ReactSwitch from "react-switch";
import { TestContext } from "pages/addTest";

interface QuestionBlockProps extends QuesLessProps {
  id: number;
}

export const QuestionBlock = ({ id, answers }: QuestionBlockProps) => {
  const {
    data,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    onGetMainProps,
  } = useContext(TestContext) as AddTestContextType;

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const currentQuestion = data.questions[id];
  const currentSwitch = currentQuestion.typeQuestion === "test" ? false : true;

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onGetMainProps({
      ...data,
      questions: data.questions.map((item, index) =>
        index === id
          ? {
              title: e.target.value,
              imageURL: item.imageURL,
              answers: [...item.answers],
              typeQuestion: item.typeQuestion,
            }
          : item
      ),
    });
  };

  const handlerAddAnswer = (id: number) => {
    onGetMainProps({
      ...data,
      questions: data.questions.map((item, index) =>
        index === id
          ? {
              title: item.title,
              imageURL: item.imageURL,
              answers: [
                ...item.answers,
                { answer: "", correct: false, typeAnswer: "test" },
              ],
              typeQuestion: item.typeQuestion,
            }
          : item
      ),
    });
  };

  const onChangeCorrect = () => {
    onGetMainProps({
      ...data,
      questions: data.questions.map(
        (item, index): QuesLessProps =>
          index === id
            ? {
                title: item.title,
                imageURL: item.imageURL,
                answers: currentSwitch
                  ? [
                      ...item.answers,
                      { answer: "", correct: false },
                      { answer: "", correct: false },
                    ]
                  : (item.answers = [{ answer: "", correct: false }]),
                typeQuestion: item.typeQuestion === "test" ? "offer" : "test",
              }
            : item
      ),
    });
  };

  const onRemoveCurrentQuestion = () => {
    onGetMainProps({
      ...data,
      questions: data.questions.filter((item, index) =>
        id !== 0
          ? (setCurrentQuestionIndex(currentQuestionIndex - 1), index !== id)
          : item
      ),
    });
  };

  const onUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files;
      const formData = new FormData();
      formData.append("picture", file![0]);

      const newAvatarUrl = await axios.post("/uploads", formData);
      const { secure_url, public_id } = newAvatarUrl.data;

      onGetMainProps({
        ...data,
        questions: data.questions.map((item, index) =>
          index === id
            ? {
                title: item.title,
                imageURL: { public_id, url: secure_url },
                answers: [...item.answers],
                typeQuestion: item.typeQuestion,
              }
            : item
        ),
      });
    } catch (err) {
      console.log(err);
      window.alert("Не удалось загрузить картинку");
    }
  };

  const onClickInput = () => {
    inputFileRef.current!.click();
  };

  return (
    <div className={styles.addNote__questions}>
      <div className={styles.addNote__questionTitle}>
        <div className={styles.addNote__questionSubTitle}>
          Вопрос #{id + 1}
          <span className={styles.addNote__type}>
            / {currentSwitch ? "предложения" : "тесты"}
          </span>
        </div>
        <div className={styles.addNote__edit}>
          <ReactSwitch onChange={onChangeCorrect} checked={currentSwitch} />
          <RemoveIcon
            width={30}
            onClick={onRemoveCurrentQuestion}
            className={styles.addNote__remove}
          />
        </div>
      </div>

      <input
        type="text"
        name="title"
        className={styles.addNote__questionsTitle}
        placeholder="Введите название вопроса"
        onChange={onChangeTitle}
        defaultValue={currentQuestion.title}
        required
      />

      <div className={styles.addNote__imageBlock}>
        <button
          className={styles.addNote__button}
          type="button"
          onClick={onClickInput}
        >
          Выберите изображение
        </button>
        <input
          type="file"
          name="picture"
          hidden
          ref={inputFileRef}
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={onUploadImage}
          className={styles.addNote__questionsTitle}
          placeholder="Изображение"
        />

        {currentQuestion.imageURL?.url && (
          <img
            className={styles.addNote__image}
            src={`${currentQuestion.imageURL?.url}`}
            alt="preview"
          />
        )}
      </div>

      {answers.map((item, index) =>
        currentSwitch ? (
          <AnswerOfferInfo id={index} key={index} idQuestion={id} />
        ) : (
          <AnswerInfo id={index} key={index} idQuestion={id} />
        )
      )}

      {!currentSwitch && (
        <span
          className={styles.addNote__answersAdd}
          onClick={() => handlerAddAnswer(id)}
        >
          Добавить ответ
        </span>
      )}
    </div>
  );
};
