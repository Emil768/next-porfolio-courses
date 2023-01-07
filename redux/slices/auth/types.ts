import { UserProps } from "propTypes";

export type AuthState = {
  data: UserProps | null;
  status: "loading" | "loaded" | "error";
};
