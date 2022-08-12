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
  description: string;
}

export type StudyStatusType = "recruiting" | "inProgress" | "finished";

// TODO: 추후 null 삭제 (백 수정 이후)
export interface StudyDetailType {
  study: StudyType;
  members: {
    id: string;
    user: UserType;
  }[];
  book: BookType;
  description: string;
  status: StudyStatusType | null;
}
