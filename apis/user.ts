import { apiClient } from "./api";
import { END_POINT } from ".";
import { TopbarUserType } from "../types/userType";

export const getMyInfo = async () => {
  const data = await apiClient.get<TopbarUserType, TopbarUserType>(
    `${END_POINT.getMyInfo}`
  );

  return data;
};

export const logout = async () => {
  await apiClient.delete(`${END_POINT.logout}`);
};

export interface PutUserType {
  id: number;
  name: string;
  image: string;
}

export const putUser = async ({ id, name, image }: PutUserType) => {
  const data = await apiClient.put(`${END_POINT.user}/${id}`, {
    name,
    image,
  });
  return data;
};

export interface getUserType {
  id: number;
}

export const getUser = async ({ id }: getUserType) => {
  const data = await apiClient.get<any, any>(`${END_POINT.user}/${id}`);
  return data;
};

export const getOpenStudy = async ({ id }: getUserType) => {
  const data = await apiClient.get<any, any>(`${END_POINT.v2_studies}`, {
    params: {
      userId: id,
      memberStatus: "OWNED",
    },
  });

  return data;
};

export const getPartiStudy = async ({ id }: getUserType) => {
  const data = await apiClient.get<any, any>(`${END_POINT.v2_studies}`, {
    params: {
      userId: id,
      isMember: true,
    },
  });

  return data;
};

export const getFinishStudy = async ({ id }: getUserType) => {
  const data = await apiClient.get<any, any>(`${END_POINT.v2_studies}`, {
    params: {
      userId: id,
      studyStatus: "finished",
    },
  });

  return data;
};
