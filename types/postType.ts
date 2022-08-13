import type { MouseEventHandler } from "react";

export interface PostsType {
  id: number;
  title: string;
  content: string;
  category: string;
  studyId: number;
  writerId: number;
  writer: string;
  writerImage: string;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}
export interface ResponsePostType {
  totalPage: number;
  posts: PostsType[];
}

export interface PostPropsType extends PostsType {
  onClick?: MouseEventHandler<HTMLElement>;
}
