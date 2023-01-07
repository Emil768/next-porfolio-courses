import { QuesProps, TestProps } from "@proptypes";

export const testResult = (quiz: TestProps) =>
  quiz?.ques.reduce(
    (acc: number, { answers }: QuesProps) =>
      acc + answers.filter(({ correct }) => correct).length,
    0
  );
