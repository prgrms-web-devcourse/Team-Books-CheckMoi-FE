import { apiClient } from "./api";
import { END_POINT } from ".";

// TODO 추후 타입 추가
export interface UserType {
  id: string;
  name: string;
  image: string;
  token: string;
}

export const putUser = async ({id, name, image, token}: UserType) => {
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
