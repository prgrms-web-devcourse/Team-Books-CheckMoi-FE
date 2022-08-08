import type { StudyType } from "../types/studyType";
import type { BookType } from "../types/bookType";

export const dummyStudy: StudyType = {
  thumbnail: "https://picsum.photos/200",
  name: "dummy study",
  gatherStartDate: "2022/07/01",
  gatherEndDate: "2022/07/31",
  studyStartDate: "2022/08/01",
  studyEndDate: "2022/08/31",
  maxParticipant: 16,
  currentParticipant: 3,
};

export const dummyBook: BookType = {
  image: "https://picsum.photos/200",
  title: "dummy book",
  author: "Juan Mayorga",
  publisher: "JongGwan Jung",
  pubdate: "1995-09-26",
  isbn: "1234567890123",
  description:
    "이것은 더미 북입니다. 이것은 더미 북입니다. 이것은 더미 북입니다?????? 이것은 더미 북입니다?????? 이것은 더미 북입니다?????? 이것은 더미 북입니다?????? 이것은 더미 북입니다?????? 이것은 더미 북입니다?????? 이것은 더미 북입니다?????? 이것은 더미 북입니다?????? 이것은 더미 북입니다??????",
};

export const dummyToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjcsInJvbGUiOiJST0xFX0xPR0lOIiwiaWF0IjoxNjU5NTAzMDY0LCJleHAiOjE2NTk1MDY2NjR9.cUyLCrvJQq18Rztwim_czujqAnv7On6q4T5r20au3JI";
