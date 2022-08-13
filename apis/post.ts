import { apiClient } from "./api";
import { END_POINT } from ".";

import type { ResponsePostType, PostsType } from "../types/postType";

const token =
  typeof document !== "undefined" ? document.cookie.split("=")[1] : "";

interface getPostType {
  studyId: number;
  category: string;
}

export const getPosts = async ({ studyId, category }: getPostType) => {
  console.log(token);
  const data = await apiClient.get<ResponsePostType, ResponsePostType>(
    `${END_POINT.posts}`,
    {
      params: { studyId, category },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const getPost = async (postId: string) => {
  const data = await apiClient.get<PostsType, PostsType>(
    `${END_POINT.posts}/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const createPost = async (post: CreatePostType) => {
  const data = await apiClient.post<any, any>(`${END_POINT.posts}`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data, "포스트 생성");
  return data;
};

export const putPost = async (postId: number, post: CreatePostType) => {
  const data = await apiClient.put(`${END_POINT.posts}/${postId}`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(postId, "포스트 수정");
  return data;
};

export const delPost = async (postId: number) => {
  const data = await apiClient.delete(`${END_POINT.posts}/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(postId, "포스트 삭제");
  return data;
};
