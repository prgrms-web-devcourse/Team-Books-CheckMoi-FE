import { apiClient } from "./api";
import { END_POINT } from ".";
import type { ResponsePostType } from "../types/postType";

interface getPostType {
  studyId: string;
  token: string;
}

export const getPosts = async ({ studyId, token }: getPostType) => {
  const data = await apiClient.get<ResponsePostType[], ResponsePostType[]>(
    `${END_POINT.posts}?studyId=${studyId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
