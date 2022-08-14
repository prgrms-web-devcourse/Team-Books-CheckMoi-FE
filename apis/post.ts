import { apiClient } from "./api";
import { END_POINT } from ".";

import type { ResponsePostType, PostsType } from "../types/postType";

interface getPostType {
  studyId: number;
  category: string;
  page: number;
  size?: string;
}

export const getPosts = async ({
  studyId,
  category,
  page,
  size = "12",
}: getPostType) => {
  const token = document.cookie.split("=")[1];
  const data = await apiClient.get<ResponsePostType, ResponsePostType>(
    `${END_POINT.posts}?page=${page}`,
    {
      params: { studyId, category, size },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

interface getPostType2 {
  studyId: number;
  category: string;
}

export const getPosts2 = async ({ studyId, category }: getPostType2) => {
  const token = document.cookie.split("=")[1];
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

interface CreatePostType {
  title: string;
  content: string;
  category: string;
  studyId: number;
}

export const getPost = async (postId: number) => {
  const token = document.cookie.split("=")[1];
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

export const createPost = async (post: CreatePostType) => {
  const token = document.cookie.split("=")[1];
  const data = await apiClient.post<any, any>(`${END_POINT.posts}`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const putPost = async (postId: number, post: CreatePostType) => {
  const token = document.cookie.split("=")[1];
  const data = await apiClient.put(`${END_POINT.posts}/${postId}`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const delPost = async (postId: number) => {
  const token = document.cookie.split("=")[1];
  const data = await apiClient.delete(`${END_POINT.posts}/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
