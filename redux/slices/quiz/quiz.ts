import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "utils/axios";
import { CommentProps, TestProps } from "propTypes";
import {
  AnswerStateProps,
  CommentPropsCreate,
  CommentPropsEdit,
  CommentPropsRemove,
  QuizProps,
} from "./types";

//Получение одного теста
export const fetchTest = createAsyncThunk<
  TestProps,
  string,
  { rejectValue: TestProps }
>("quiz/fetchTest", async (id) => {
  const { data } = await axios.get(`/tests/${id}`);
  return data;
});

//Создание комментария
export const fetchAddComment = createAsyncThunk<
  CommentProps,
  CommentPropsCreate,
  { rejectValue: CommentProps }
>("quiz/fetchAddComment", async ({ text, testId }) => {
  const { data } = await axios.post(`/comments`, { text, testId });
  return data;
});

//Обновление комментария
export const fetchUpdateComment = createAsyncThunk<
  CommentProps[],
  CommentPropsEdit,
  { rejectValue: CommentProps[] }
>("quiz/fetchUpdateComment", async ({ testId, id, text }) => {
  const { data } = await axios.post(`/comments/edit/${id}`, { testId, text });
  return data;
});

//Удаление комментария
export const fetchRemoveComment = createAsyncThunk<
  CommentProps[],
  CommentPropsRemove,
  { rejectValue: CommentProps[] }
>("quiz/fetchRemoveComment", async ({ testId, id }) => {
  const { data } = await axios.post(`/comments/${id}`, { testId });
  return data;
});

const initialState: QuizProps = {
  quiz: {} as TestProps,
  currentQuesIndex: 0,
  currentAnswer: { index: 0, answer: "" },
  score: 0,
  showScore: false,
  status: "loading",
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setAnswerQuestion: (state, action: PayloadAction<AnswerStateProps>) => {
      const currentAnswerQuestion = state.quiz?.ques[state.currentQuesIndex];
      state.score += state.currentAnswer.answer
        ? currentAnswerQuestion.answers[action.payload.index!].answer
            .replace(/\s/g, "")
            .toLowerCase() ===
          state.currentAnswer.answer.replace(/\s/g, "").toLowerCase()
          ? 1
          : 0
        : currentAnswerQuestion.answers[action.payload.index!].correct
        ? 1
        : 0;

      state.currentQuesIndex += 1;
    },

    onNextQuestion: (state) => {
      state.currentQuesIndex += 1;
    },

    onGetCurrentAnswer: (state, action: PayloadAction<AnswerStateProps>) => {
      state.currentAnswer = {
        index: action.payload.index,
        answer: action.payload.answer,
      };
    },

    setShowScore: (state) => {
      state.showScore = true;
    },
    getAllComments: (state) => {
      state.quiz.comments.filter((item) => item);
    },
  },
  extraReducers: (builder) => {
    //Один тест
    builder
      .addCase(fetchTest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTest.fulfilled, (state, action) => {
        state.quiz = action.payload;
        state.currentQuesIndex = 0;
        state.showScore = false;
        state.score = 0;
        state.status = "loaded";
      })
      .addCase(fetchTest.rejected, (state) => {
        state.quiz = {} as TestProps;
        state.status = "error";
      })

      //Add comment

      .addCase(fetchAddComment.pending, (state) => {})
      .addCase(fetchAddComment.fulfilled, (state, action) => {
        state.quiz.comments.push(action.payload);
        state.status = "loaded";
      })
      .addCase(fetchAddComment.rejected, (state) => {
        state.quiz = {} as TestProps;
        state.status = "error";
      })

      //Update comment

      .addCase(fetchUpdateComment.pending, (state) => {})
      .addCase(fetchUpdateComment.fulfilled, (state, action) => {
        state.quiz.comments = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchUpdateComment.rejected, (state) => {
        state.quiz = {} as TestProps;
        state.status = "error";
      })

      //Remove comment

      .addCase(fetchRemoveComment.pending, (state) => {})
      .addCase(fetchRemoveComment.fulfilled, (state, action) => {
        state.quiz.comments = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchRemoveComment.rejected, (state) => {
        state.quiz = {} as TestProps;
        state.status = "error";
      });
  },
});

export const quizReducer = quizSlice.reducer;

export const {
  setAnswerQuestion,
  setShowScore,
  onNextQuestion,
  onGetCurrentAnswer,
  getAllComments,
} = quizSlice.actions;
