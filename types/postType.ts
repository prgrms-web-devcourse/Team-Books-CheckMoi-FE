import type { MouseEventHandler } from "react";
import type { User } from "./userType";

export interface PostType {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  comments: number;
  size: number;
  user: User;
  onClick?: MouseEventHandler<HTMLElement>;
}
