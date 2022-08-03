import { apiClient } from "./api";
import { END_POINT } from ".";
import type { Book } from "../types/bookType";

export const getBooksList = async () => {
  const data = await apiClient.get(`${END_POINT.book}`);

  return data;
};

export const registerBook = async (book: Book, accessToken: string) => {
  const data = await apiClient.put(`${END_POINT.book}`, JSON.stringify(book), {
    headers: {
      Authorization: `bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const getBookInfo = async (bookId: string) => {
  const data = await apiClient.get(`${END_POINT.book}/${bookId}`);

  return data;
};
