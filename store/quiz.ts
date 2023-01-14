import axios from "utils/axios";
import { CommentProps, TestProps } from "propTypes";
import { AnswerStateProps } from "redux/slices";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { QuizStateProps } from "./types";

const useQuizStore = create<QuizStateProps>()(
  devtools(
    (set) => ({
      quiz: {} as TestProps,
      currentQuesIndex: 0,
      currentAnswer: { index: 0, answer: "" },
      score: 0,
      showScore: false,
      status: "loading",
      fetchTest: (data) => {
        try {
          set({
            quiz: data,
            status: "loaded",
            currentQuesIndex: 0,
            showScore: false,
            score: 0,
          });
        } catch (err) {
          console.log(err);
          set({ status: "error" });
        }
      },
      setAnswerQuestion: ({ index }: AnswerStateProps) => {
        set((state) => ({
          score: (state.score += state.currentAnswer.answer
            ? state.quiz.ques[state.currentQuesIndex].answers[index!].answer
                .replace(/\s/g, "")
                .toLowerCase() ===
              state.currentAnswer.answer.replace(/\s/g, "").toLowerCase()
              ? 1
              : 0
            : state.quiz.ques[state.currentQuesIndex].answers[index!].correct
            ? 1
            : 0),
          currentQuesIndex: state.currentQuesIndex + 1,
        }));
      },
      onGetCurrentAnswer: (answer: AnswerStateProps) =>
        set({ currentAnswer: answer }),
      onNextQuestion: () =>
        set((state) => ({ currentQuesIndex: state.currentQuesIndex + 1 })),
      setShowScore: () => set({ showScore: true }),

      //comments

      fetchAddComment: async ({ testId, text }) => {
        try {
          const { data } = await axios.post<CommentProps>(`/comments`, {
            text,
            testId,
          });

          set((state) => ({
            quiz: { ...state.quiz, comments: [...state.quiz.comments, data] },
          }));
        } catch (err) {
          set({ status: "error" });
        }
      },
    }),
    { name: "quiz" }
  )
);

export default useQuizStore;
