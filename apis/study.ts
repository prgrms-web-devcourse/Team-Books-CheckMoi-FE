import { apiClient } from "./api";
import { END_POINT } from ".";

export const getStudyDetailInfo = async (studyId: string) => {
  const data = await apiClient.get(`${END_POINT.study}/${studyId}`);
  return data;
};
