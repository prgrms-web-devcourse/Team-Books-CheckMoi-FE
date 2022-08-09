import { apiClient } from "./api";
import { END_POINT } from ".";
import type { StudyDetailType, StudyType } from "../types/studyType";
import { dummyToken } from "../commons/dummy";

export const getStudies = async (bookId: string, page = 1) => {
  const data = await apiClient.get<any, any>(
    `${END_POINT.studies}?bookId=${bookId}&size=8&page=${page}`
  );
  return data.studies.content as StudyType[];
};

export const getStudyDetailInfo = async (studyId: string) => {
  const data = await apiClient.get<StudyDetailType, StudyDetailType>(
    `${END_POINT.studies}/${studyId}`
  );
  return data;
};

// TODO: studyType
export const createStudy = async (study, token: string) => {
  const data = await apiClient.post(
    `${END_POINT.studies}`,
    JSON.stringify(study),
    {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};
