export type AvatarProps = {
  public_id: string;
  url: string;
};

export interface UserProps {
  _id?: string;
  fullName: string;
  email?: string;
  token?: string;
  password?: string;
  avatarUrl: AvatarProps;
  createdAt?: string;
}

export type SwithProps = {
  title: string;
  type: string;
  component: JSX.Element;
};
