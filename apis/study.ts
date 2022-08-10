import { apiClient } from "./api";
import { END_POINT } from ".";
import type { StudyDetailType, StudyType } from "../types/studyType";

interface ResponseStudiesType {
  studiesData: StudyType[];
  totalPage: number;
}

export const getStudies = async (bookId: string, page = 1) => {
  const data = await apiClient.get<any, any>(
    `${END_POINT.studies}?bookId=${bookId}&size=8&page=${page}`
  );
  return { studiesData: data.studies, totalPage: data.totalPage };
};

export const getStudyDetailInfo = async (studyId: string) => {
  const data = await apiClient.get<StudyDetailType, StudyDetailType>(
    `${END_POINT.studies}/${studyId}`
  );
  return data;
};
