import type { BookType } from './bookType';
import type { User } from './userType';

export interface StudyType {
  id?: string;
  name: string;
  thumbnailUrl: string;
  currentParticipant: number;
  maxParticipant: number;
  gatherStartDate: string;
  gatherEndDate: string;
  studyStartDate: string;
  studyEndDate: string;
}

export interface StudyDetailType extends StudyType {
  members: User[];
  book: BookType;
  description: string;
}
