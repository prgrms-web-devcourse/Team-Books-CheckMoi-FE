import { apiClient } from "./api";
import { END_POINT } from ".";
import type { StudyDetailType, StudyType } from "../types/studyType";

export const getStudies = async (bookId: string, page = 1) => {
  const data = await apiClient.get<any, any>(
    `${END_POINT.studies}?bookId=${bookId}&size=8&page=${page}`
  );
  return data.studies as StudyType[];
};

export const getStudyDetailInfo = async (studyId: string) => {
  const data = await apiClient.get<StudyDetailType, StudyDetailType>(
    `${END_POINT.studies}/${studyId}`
  );
  return data;
};

export interface ICreateStudy {
  newStudyInfo: {
    bookId: number;
    name: string;
    thumbnail: string;
    description: string;
    maxParticipant: number;
    gatherStartDate: string;
    gatherEndDate: string;
    studyStartDate: string;
    studyEndDate: string;
  };
  token: string;
}

// TODO: studyType
export const createStudy = async ({ newStudyInfo, token }: ICreateStudy) => {
  const data = await apiClient.post<number, number>(
    `${END_POINT.studies}`,
    JSON.stringify(newStudyInfo),
    {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};
