import { UserProps } from "./userProps";

export interface CategoryOption {
  value: string;
  label: string;
  isDisabled?: boolean;
}
export type ImageUrlProps = { public_id: string; url: string };
export type TypeTest = "test" | "offer";

export interface QuesProps {
  _id: string;
  title: string;
  imageURL?: ImageUrlProps;
  answers: AnswersProps[];
  typeQuestion: TypeTest;
}

export interface AnswersProps {
  _id: string;
  answer: string;
  correct: boolean;
}

export type CurrentAnswerProps = {
  id: number;
} & AnswersProps;

export interface CommentProps {
  text: string;
  postedBy: UserProps;
  createdAt: string;
  testId: string;
  _id: string;
}
export interface ScoreProps {
  _id: string;
  scoreBy: UserProps;
  totalScore: number;
  createdAt: string;
}
export interface LikeProps {
  likeBy: UserProps;
  _id: string;
  createdAt: string;
}

export interface TestProps {
  _id: string;
  title: string;
  text: string;
  category: CategoryOption;
  backgroundImage: ImageUrlProps;
  viewsCount: number;
  createdAt: string;
  ques: QuesProps[];
  user: UserProps;
  likes: LikeProps[];
  comments: CommentProps[];
  score: ScoreProps[];
}

export interface AllUserActionProps {
  allComments: TestProps[];
  allLikes: TestProps[];
  allPublish: TestProps[];
  allScore: TestProps[];
}

export interface AnswerBlockProps extends AnswersProps {
  keyIndex: number;
}

//Add test props

export type AnswerLessProps = Omit<AnswersProps, "_id">;

export interface QuesLessProps {
  title: string;
  imageURL?: ImageUrlProps;
  answers: AnswerLessProps[];
  typeQuestion: TypeTest;
}

export type MainAddTestProps = {
  title: string;
  category: CategoryOption;
  text: string;
  bgImage: ImageUrlProps;
  questions: QuesLessProps[];
};

export type AddTestContextType = {
  data: MainAddTestProps;
  onGetMainProps: ({
    title,
    category,
    text,
    bgImage,
  }: MainAddTestProps) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
};
