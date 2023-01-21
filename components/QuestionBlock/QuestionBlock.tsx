import { useRef } from "react";

import { QuesLessProps } from "propTypes";
import { AnswerInfo, AnswerOfferInfo } from "components";

import styles from "./QuestionBlock.module.scss";
import { RemoveIcon } from "public/icons";

import axios from "axios";
import ReactSwitch from "react-switch";
import useTestStore from "store/test";

import Image from "next/legacy/image";

interface QuestionBlockProps extends QuesLessProps {
  id: number;
}

export const QuestionBlock = ({ id, answers }: QuestionBlockProps) => {
  const { data, currentQuestionIndex, setPrevQuestion, onGetProps } =
    useTestStore();

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const currentQuestion = data.questions[id];
  const currentSwitch = currentQuestion.typeQuestion === "test" ? false : true;

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onGetProps({
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
    onGetProps({
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
    onGetProps({
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
    if (id !== 0) {
      onGetProps({
        ...data,
        questions: data.questions.filter((item, index) => index !== id),
      });
      setPrevQuestion();
    }
  };

  const onUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files![0];
      const formData = new FormData();
      formData.append("file", file);

      formData.append("upload_preset", "portfolio_uploads");

      const newAvatarUrl = await axios.post(
        "https://api.cloudinary.com/v1_1/dl4ooiriz/image/upload",
        formData
      );

      const { secure_url, public_id } = newAvatarUrl.data;

      onGetProps({
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
          <div className={styles.addNote__image}>
            <Image
              layout="fill"
              src={`${currentQuestion.imageURL?.url}`}
              alt="preview"
            />
          </div>
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
