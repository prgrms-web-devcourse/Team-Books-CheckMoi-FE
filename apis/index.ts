export const END_POINT = {
  book: "/books",
  studies: "/studies",
  image: "/images",
  user: "/users",
};

export { getNaverBooks } from "./naver";

export { getBooksList, getBookInfo, registerBook } from "./book";

export { postImage } from "./image";

export { putUser } from "./user";
