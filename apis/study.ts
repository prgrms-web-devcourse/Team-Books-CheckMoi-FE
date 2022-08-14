import { apiClient } from "./api";
import { END_POINT } from ".";
import type { StudyDetailType, StudyType } from "../types/studyType";

interface ResponseStudiesType {
  studiesData: StudyType[];
  totalPage: number;
}

export const getStudies = async (bookId: number, page = 1) => {
  const data = await apiClient.get<any, any>(
    `${END_POINT.studies}?bookId=${bookId}&size=8&page=${page}`
  );
  return { studiesData: data.studies, totalPage: data.totalPage };
};

export const getStudyDetailInfo = async (studyId: number) => {
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
}

export const createStudy = async ({ newStudyInfo }: ICreateStudy) => {
  const data = await apiClient.post<number, number>(
    `${END_POINT.studies}`,
    JSON.stringify(newStudyInfo)
  );

  return data;
};

export const joinStudy = async (id: number) => {
  const data = await apiClient.put<number>(
    `${END_POINT.studies}/${id}/members`
  );
  return data;
};

interface IUpdateStudy {
  studyId: number;
  newStudyInfo: {
    name: string;
    thumbnail: string;
    description: string;
    status: string;
  };
}

export const updateStudy = async ({ studyId, newStudyInfo }: IUpdateStudy) => {
  const data = await apiClient.put<number, number>(
    `${END_POINT.studies}/${studyId}`,
    { ...newStudyInfo }
  );

  return data;
};
