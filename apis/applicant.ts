import { apiClient } from "./api";
import { END_POINT } from ".";
import type { ResponseApplicantMemberType } from "../types/applicantType";

interface getApplicantsProps {
  studyId: number;
}

interface putApplicantProps {
  studyId: number;
  memberId: number;
  status: string;
}

export const getApplicantMembers = async ({ studyId }: getApplicantsProps) => {
  const data = await apiClient.get<
    ResponseApplicantMemberType,
    ResponseApplicantMemberType
  >(`${END_POINT.applicants}/${studyId}/members`);
  return data.members;
};

export const putApplicantAcceptOrDeny = async ({
  studyId,
  memberId,
  status,
}: putApplicantProps) => {
  const data = await apiClient.put(
    `${END_POINT.applicants}/${studyId}/members/${memberId}`,
    { status }
  );
  return data;
};
