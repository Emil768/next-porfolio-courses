import { TestProps } from "@proptypes";

export type TestState = {
  tests: TestProps[];
  status: "loading" | "loaded" | "error";
};
