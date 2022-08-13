import { apiClient } from "./api";
import { END_POINT } from ".";
import type { ResponseApplicantMemberType } from "../types/applicantType";

interface getApplicantsProps {
  studyId: string;
}

interface putApplicantProps {
  studyId: string;
  memberId: string;
  status: string;
}

export const getApplicantMembers = async ({ studyId }: getApplicantsProps) => {
  const token = document.cookie.split("=")[1];
  const data = await apiClient.get<
    ResponseApplicantMemberType,
    ResponseApplicantMemberType
  >(`${END_POINT.applicants}/${studyId}/members`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.members;
};

export const putApplicantAcceptOrDeny = async ({
  studyId,
  memberId,
  status,
}: putApplicantProps) => {
  const token = document.cookie.split("=")[1];
  const data = await apiClient.put(
    `${END_POINT.applicants}/${studyId}/members/${memberId}`,
    { status },
    {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }
  );
  return data;
};
