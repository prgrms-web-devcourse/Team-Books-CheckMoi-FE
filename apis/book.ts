import { AxiosResponse } from "axios";
import { apiClient } from "./api";
import { END_POINT } from ".";
import type { BookType } from "../types/bookType";

export const getBooksList = async () => {
  const data = await apiClient.get(`${END_POINT.book}`);

  return data;
};

export const registerBook = async (book: BookType, accessToken: string) => {
  const data = await apiClient.put(`${END_POINT.book}`, JSON.stringify(book), {
    headers: {
      Authorization: `bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const getBookInfo = async (bookId: string) => {
  const data = await apiClient.get<BookType, BookType>(
    `${END_POINT.book}/${bookId}`
  );

  return data;
};
