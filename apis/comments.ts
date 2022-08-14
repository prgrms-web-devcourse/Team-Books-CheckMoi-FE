import { apiClient } from "./api";
import { END_POINT } from ".";
import type { ResponseCommentsType } from "../types/commentType";

interface getCommentProps {
  postId: number;
  page?: number;
}

interface postCommentProps {
  postId: number;
  content: string;
}

interface deleteCommentProps {
  commentId: number;
}

interface putCommentProps {
  commentId: number;
  content: string;
}

export const getComments = async ({ postId, page }: getCommentProps) => {
  const data = await apiClient.get<ResponseCommentsType, ResponseCommentsType>(
    `${END_POINT.comments}/?postId=${postId}&page=${page}`
  );
  return data;
};

export const postComments = async ({ postId, content }: postCommentProps) => {
  const data = await apiClient.post(`${END_POINT.comments}?postId=${postId}`, {
    content,
  });

  return data;
};

export const deleteComment = async ({ commentId }: deleteCommentProps) => {
  const data = await apiClient.delete(`${END_POINT.comments}/${commentId}`);

  return data;
};

export const putComment = async ({ commentId, content }: putCommentProps) => {
  const data = await apiClient.put(`${END_POINT.comments}/${commentId}`, {
    content,
  });

  return data;
};
