import { apiClient } from "./api";
import { END_POINT } from ".";

import type { ResponsePostType, PostsType } from "../types/postType";

interface getPostType {
  studyId: number;
  category: string;
}

export const getPosts = async ({ studyId, category }: getPostType) => {
  const data = await apiClient.get<ResponsePostType, ResponsePostType>(
    `${END_POINT.posts}`,
    {
      params: { studyId, category },
    }
  );
  return data;
};

interface CreatePostType {
  title: string;
  content: string;
  category: string;
  studyId: number;
}

export const getPost = async (postId: number) => {
  const data = await apiClient.get<PostsType, PostsType>(
    `${END_POINT.posts}/${postId}`
  );
  return data;
};

export const createPost = async (post: CreatePostType) => {
  const data = await apiClient.post<any, any>(`${END_POINT.posts}`, post);
  return data;
};

export const putPost = async (postId: number, post: CreatePostType) => {
  const data = await apiClient.put(`${END_POINT.posts}/${postId}`, post);
  return data;
};

export const delPost = async (postId: number) => {
  const data = await apiClient.delete(`${END_POINT.posts}/${postId}`);
  return data;
};
