import { apiClient } from "./api";
import { END_POINT } from ".";

export const getUser = async (id: string, token: string) => {
  const data = await apiClient.get<any, any>(`${END_POINT.user}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
