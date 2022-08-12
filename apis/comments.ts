import { apiClient } from "./api";
import { END_POINT } from ".";
import { ResponseCommentsType } from "../types/commentType";

const token =
  typeof document !== "undefined" ? document.cookie.split("=")[1] : "";

interface getCommentProps {
  postId: string;
}

interface postCommentProps {
  postId: string;
  content: string;
}

interface deleteCommentProps {
  commentId: string;
}

interface putCommentProps {
  commentId: string;
  content: string;
}

export const getComments = async ({ postId }: getCommentProps) => {
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
  const data = await apiClient.delete(`${END_POINT.comments}/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const putComment = async ({ commentId, content }: putCommentProps) => {
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
