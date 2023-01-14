import { QuesProps, TestProps } from "propTypes";

export const testResult = (ques: QuesProps[]) =>
  ques.reduce(
    (acc: number, { answers }: QuesProps) =>
      acc + answers.filter(({ correct }) => correct).length,
    0
  );
