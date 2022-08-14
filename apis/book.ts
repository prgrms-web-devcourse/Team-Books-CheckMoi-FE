import { apiClient } from "./api";
import { END_POINT } from ".";
import type { BookType, NaverBookType } from "../types/bookType";

export const getBooksList = async () => {
  const data = await apiClient.get(`${END_POINT.book}`);

  return data;
};

export const registerBook = async (book: NaverBookType) => {
  const data = await apiClient.post<number, number>(
    `${END_POINT.book}`,
    JSON.stringify(book)
  );

  return data;
};

export const getBookInfo = async (bookId: number) => {
  const data = await apiClient.get<BookType, BookType>(
    `${END_POINT.book}/${bookId}`
  );

  return data;
};

export const getBookInfoByISBN = async (isbn: string) => {
  const data = await apiClient.get<BookType, BookType>(
    `${END_POINT.isbnBook}/${isbn}`
  );
  return data;
};
