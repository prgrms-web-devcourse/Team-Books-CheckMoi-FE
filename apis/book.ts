import { apiClient } from "./api";
import { END_POINT } from ".";
import type { BookType, NaverBookType, V2BookType } from "../types/bookType";

export const getBooksList = async () => {
  const data = await apiClient.get(`${END_POINT.book}`);

  return data;
};

export const registerBook = async (
  book: NaverBookType,
  accessToken: string
) => {
  const data = await apiClient.post<number, number>(
    `${END_POINT.book}`,
    JSON.stringify(book),
    {
      headers: {
        Authorization: `bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
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

export const getBooksByLatestStudy = async () => {
  const data = await apiClient.get<V2BookType, V2BookType>(
    `${END_POINT.v2_books}?latestStudy=true&size=10`
  );
  return data;
};

export const getBooksByMostStudy = async () => {
  const data = await apiClient.get<V2BookType, V2BookType>(
    `${END_POINT.v2_books}?mostStudy=true&size=10`
  );
  return data;
};
