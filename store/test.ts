import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { TestStateProps } from "./types";

const useTestStore = create<TestStateProps>()(
  devtools(
    (set) => ({
      data: {
        title: "",
        category: { label: "", value: "" },
        bgImage: { public_id: "", url: "" },
        text: "",
        questions: [
          {
            title: "",
            imageURL: { public_id: "", url: "" },
            answers: [
              { answer: "", correct: false },
              { answer: "", correct: false },
              { answer: "", correct: false },
            ],
            typeQuestion: "test",
          },
        ],
      },

      currentQuestionIndex: 1,

      //Clear

      clearState: () =>
        set({
          data: {
            title: "",
            category: { label: "", value: "" },
            bgImage: { public_id: "", url: "" },
            text: "",
            questions: [
              {
                title: "",
                imageURL: { public_id: "", url: "" },
                answers: [
                  { answer: "", correct: false },
                  { answer: "", correct: false },
                  { answer: "", correct: false },
                ],
                typeQuestion: "test",
              },
            ],
          },
        }),

      //Get props

      onGetProps: (newState) => {
        set({ data: newState });
      },

      //Add Question

      addQuestion: () => {
        set((state) => ({
          data: {
            ...state.data,
            questions: [
              ...state.data.questions,
              {
                title: "",
                imageURL: { public_id: "", url: "" },
                answers: [
                  { answer: "", correct: false },
                  { answer: "", correct: false },
                  { answer: "", correct: false },
                ],
                typeQuestion: "test",
              },
            ],
          },
          currentQuestionIndex: state.currentQuestionIndex + 1,
        }));
      },

      //Next Question

      setNextQuestion: () =>
        set((state) => ({
          currentQuestionIndex: state.currentQuestionIndex + 1,
        })),

      //Prev Question

      setPrevQuestion: () =>
        set((state) => ({
          currentQuestionIndex: state.currentQuestionIndex - 1,
        })),
    }),
    { name: "test" }
  )
);

export default useTestStore;
