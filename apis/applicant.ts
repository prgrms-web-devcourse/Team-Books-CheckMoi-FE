import { apiClient } from "./api";
import { END_POINT } from ".";
import { ResponseApplicantsType } from "../types/applicantType";

interface getApplicantsProps {
  studyId: string;
  token: string;
}

export const getApplicants = async ({ studyId, token }: getApplicantsProps) => {
  const data = await apiClient.get<
    ResponseApplicantsType,
    ResponseApplicantsType
  >(`${END_POINT.applicants}/${studyId}/members`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.appliers;
};
