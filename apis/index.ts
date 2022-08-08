export const END_POINT = {
  book: "/books",
  studies: "/studies",
  image: "/images",
  user: "/users",
  fakeLogin: "/tokens/7",
  getMyInfo: "/me",
  logout: "/logout",
};

export { getNaverBooks } from "./naver";

export { getBooksList, getBookInfo, registerBook } from "./book";

export { postImage } from "./image";

export { putUser } from "./user";
