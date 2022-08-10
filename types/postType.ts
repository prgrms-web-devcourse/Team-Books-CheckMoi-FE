import type { MouseEventHandler } from "react";
import type { UserType } from "./userType";

export interface PostType {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  comments: number;
  size: number;
  user: UserType;
  onClick?: MouseEventHandler<HTMLElement>;
}
