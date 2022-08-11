import type { MouseEventHandler } from "react";
import type { UserType } from "./userType";

export interface ResponsePostType {
  id: number;
  title: string;
  content: string;
  category: string;
  studyId: number;
  writer: string;
  writerImage: string;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}
export interface PostPropsType extends ResponsePostType {
  onClick?: MouseEventHandler<HTMLElement>;
}
