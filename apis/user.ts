import axios from "axios";
import { apiClient } from "./api";
import { END_POINT } from ".";
import { TopbarUserType } from "../types/userType";

export const fakeLogin = async () => {
  const data = await axios.get<string>(
    `${process.env.NEXT_PUBLIC_API_END_POINT}${END_POINT.fakeLogin}`
  );

  return data.data;
};

export const getMyInfo = async (token: string) => {
  const data = await apiClient.get<TopbarUserType, TopbarUserType>(
    `${END_POINT.getMyInfo}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const logout = async (token: string) => {
  await apiClient.delete(`${END_POINT.logout}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// TODO 추후 타입 추가
export interface PutUserType {
  id: number;
  name: string;
  image: string;
  token: string;
}

export const putUser = async ({ id, name, image, token }: PutUserType) => {
  const data = await apiClient.put(
    `${END_POINT.user}/${id}`,
    {
      name,
      image,
    },
    {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }
  );
  return data;
};

// TODO 추후 타입 추가
export interface getUserType {
  id: number;
  token: string;
}

export const getUser = async ({ id, token }: getUserType) => {
  const data = await apiClient.get<any, any>(`${END_POINT.user}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getOpenStudy = async ({ id, token }: getUserType) => {
  const data = await apiClient.get<any, any>(`${END_POINT.v2_studies}`, {
    params: {
      userId: id,
      memberStatus: "OWNED",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getPartiStudy = async ({ id, token }: getUserType) => {
  const data = await apiClient.get<any, any>(`${END_POINT.v2_studies}`, {
    params: {
      userId: id,
      isMember: true,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getFinishStudy = async ({ id, token }: getUserType) => {
  const data = await apiClient.get<any, any>(`${END_POINT.v2_studies}`, {
    params: {
      userId: id,
      studyStatus: "finished",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
