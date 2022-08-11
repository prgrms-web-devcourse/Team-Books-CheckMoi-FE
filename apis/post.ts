import { apiClient } from "./api";
import { END_POINT } from ".";

export const getPost = async (postId: string, token: string) => {
  const data = await apiClient.get(`${END_POINT.posts}/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const putPost = async(postId: string, token: string) => {
  const data = await apiClient.put(`${END_POINT.posts}/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
