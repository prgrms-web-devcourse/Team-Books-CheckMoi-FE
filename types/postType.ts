import type { MouseEventHandler } from "react";

export interface PostsType {
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
export interface ResponsePostType {
  totalPage: number;
  posts: PostsType[];
}

export interface PostPropsType {
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
  onClick?: MouseEventHandler<HTMLElement>;
}
