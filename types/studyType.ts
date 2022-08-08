import type { BookType } from "./bookType";
import type { UserType } from "./userType";

export interface StudyType {
  id: string;
  name: string;
  thumbnail: string;
  currentParticipant: number;
  maxParticipant: number;
  gatherStartDate: string;
  gatherEndDate: string;
  studyStartDate: string;
  studyEndDate: string;
}

export interface StudyDetailType {
  study: StudyType;
  members: UserType[];
  book: BookType;
  description: string;
}
