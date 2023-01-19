import { LoginProps, MainAddTestProps, TestProps, UserProps } from "propTypes";

export type AnswerStateProps = { index: number | null; answer?: string };
export type CommentPropsCreate = { testId: string; text: string };
export type CommentPropsEdit = {
  text: string;
  testId: string;
  id: string;
};

export type CommentPropsRemove = {
  testId: string;
  id: string;
};

export type AuthStateProps = {
  data: UserProps | null;
  status: "loading" | "loaded" | "error";
  fetchAuth: (values: LoginProps) => Promise<UserProps>;
  fetchAuthRegister: (values: UserProps) => Promise<UserProps>;
  fethAuthMe: () => void;
  logout: () => void;
};
export type QuizStateProps = {
  quiz: TestProps;
  currentQuesIndex: number;
  currentAnswer: AnswerStateProps;
  score: number;
  showScore: boolean;
  status: "loading" | "loaded" | "error";
  fetchTest: (data: TestProps) => void;
  setAnswerQuestion: (answer: AnswerStateProps) => void;
  onGetCurrentAnswer: (answer: AnswerStateProps) => void;
  setShowScore: () => void;
};

export type TestStateProps = {
  data: MainAddTestProps;
  currentQuestionIndex: number;
  onGetProps: ({ title, category, text, bgImage }: MainAddTestProps) => void;
  clearState: () => void;
  setNextQuestion: () => void;
  setPrevQuestion: () => void;
  addQuestion: () => void;
};
