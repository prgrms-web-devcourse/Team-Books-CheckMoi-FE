import type { BookType } from "./bookType";
import type { User } from "./userType";

export interface StudyType {
  bookId?: string;
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
  members: User[];
  book: BookType;
  description: string;
}
