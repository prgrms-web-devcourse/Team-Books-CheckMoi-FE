import type { MouseEventHandler } from "react";
import type { User } from "./userType";

export interface PostType {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  comments: number;
  size: number;
  user: User;
  onClick?: MouseEventHandler<HTMLElement>;
}
