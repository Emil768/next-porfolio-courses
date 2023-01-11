import { TestProps } from "@proptypes";

export type AnswerStateProps = { index: number | null; answer?: string };

export type QuizProps = {
  quiz: TestProps;
  currentQuesIndex: number;
  currentAnswer: AnswerStateProps;
  score: number;
  showScore: boolean;
  status: "loading" | "loaded" | "error";
};

export type CommentPropsCreate = {
  testId: string;
  text: string;
};

export type CommentPropsEdit = {
  text: string;
  testId: string;
  id: string;
};

export type CommentPropsRemove = {
  testId: string;
  id: string;
};

export type NextQuestionProps = {
  id: number;
  correct: boolean;
};
