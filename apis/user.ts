import axios from "axios";
import { apiClient } from "./api";
import { END_POINT } from ".";
import { User } from "../types/userType";

export const fakeLogin = async () => {
  const data = await axios.get<string>(
    `${process.env.NEXT_PUBLIC_API_END_POINT}${END_POINT.fakeLogin}`
  );

  return data.data;
};

export const getMyInfo = async (token: string) => {
  const data = await apiClient.get<User, User>(`${END_POINT.getMyInfo}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
