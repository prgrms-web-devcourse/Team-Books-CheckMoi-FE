import { apiClient } from "./api";
import { END_POINT } from ".";
import { ResponseCommentsType } from "../types/commentType";

interface getCommentProps {
  postId: number;
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

export const getComments = async ({ postId }: getCommentProps) => {
  const token = document.cookie.split("=")[1];
  const data = await apiClient.get<ResponseCommentsType, ResponseCommentsType>(
    `${END_POINT.comments}/?postId=${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const postComments = async ({ postId, content }: postCommentProps) => {
  const token = document.cookie.split("=")[1];
  const data = await apiClient.post(
    `${END_POINT.comments}?postId=${postId}`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const deleteComment = async ({ commentId }: deleteCommentProps) => {
  const token = document.cookie.split("=")[1];
  const data = await apiClient.delete(`${END_POINT.comments}/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const putComment = async ({ commentId, content }: putCommentProps) => {
  const token = document.cookie.split("=")[1];
  const data = await apiClient.put(
    `${END_POINT.comments}/${commentId}`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};
