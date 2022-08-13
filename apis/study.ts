import { apiClient } from "./api";
import { END_POINT } from ".";
import type { StudyDetailType, StudyType } from "../types/studyType";
import { dummyToken } from "../commons/dummy";

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

export const joinStudy = async (id: string, token: string) => {
  const data = await apiClient.put(
    `${END_POINT.studies}/${id}/members`,
    {},
    {
      headers: {
        Authorization: `bearer ${token}`,
              },
    }
  );
  return data;
};

interface IUpdateStudy {
  studyId: string;
  newStudyInfo: {
    name: string;
    thumbnail: string;
    description: string;
    status: string;
  };
  token: string;
}

export const updateStudy = async ({
  studyId,
  newStudyInfo,
  token,
}: IUpdateStudy) => {
  const data = await apiClient.put<number, number>(
    `${END_POINT.studies}/${studyId}`,
    { ...newStudyInfo },
    {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};
