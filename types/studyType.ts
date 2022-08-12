import type { BookType } from "./bookType";
import type { UserType } from "./userType";

// 모집중 | 모집완료 | 스터디 진행 중 | 스터디 완료
export type StudyStatusType =
  | "recruiting"
  | "recruitingFinished"
  | "inProgress"
  | "finished";

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
  status?: StudyStatusType | null;
}

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
