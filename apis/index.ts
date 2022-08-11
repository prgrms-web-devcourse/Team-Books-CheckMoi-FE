export const END_POINT = {
  book: "/books",
  studies: "/studies",
  image: "/images",
  user: "/users",
  fakeLogin: "/tokens/7",
  getMyInfo: "/me",
  logout: "/logout",
  isbnBook: "/books/isbn",
  posts: "/posts",
};

export { getNaverBooks } from "./naver";

export { getBooksList, getBookInfo, registerBook } from "./book";

export { postImage } from "./image";

export { getUser, putUser } from "./user";

export { getPost, createPost, putPost } from "./post";
