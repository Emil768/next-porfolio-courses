import { LoginProps, TestProps, UserProps } from "propTypes";

export type AnswerStateProps = { index: number | null; answer?: string };
export type CommentPropsCreate = { testId: string; text: string };
export type AuthStateProps = {
  user: UserProps;
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
  fetchAddComment: (comment: CommentPropsCreate) => void;
  setAnswerQuestion: (answer: AnswerStateProps) => void;
  onGetCurrentAnswer: (answer: AnswerStateProps) => void;
  setShowScore: () => void;
  onNextQuestion: () => void;
};

export type TestStateProps = {
  tests: TestProps[];
  status: "loading" | "loaded" | "error";
  fetchTests: (data: TestProps[]) => void;
};
