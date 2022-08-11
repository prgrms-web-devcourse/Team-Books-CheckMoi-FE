export const END_POINT = {
  book: "/books",
  studies: "/studies",
  v2_studies: "/v2/studies",
  image: "/images",
  user: "/users",
  fakeLogin: "/tokens/7",
  getMyInfo: "/me",
  logout: "/logout",
  isbnBook: "/books/isbn",
};

export { getNaverBooks } from "./naver";

export { getBooksList, getBookInfo, registerBook } from "./book";

export { postImage } from "./image";

export {
  getUser,
  putUser,
  getOpenStudy,
  getPartiStudy,
  getFinishStudy,
} from "./user";

export { getStudies, getStudyDetailInfo, createStudy } from "./study";
