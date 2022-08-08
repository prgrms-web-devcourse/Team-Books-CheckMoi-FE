import { apiClient } from "./api";
import { END_POINT } from ".";

export const putUser = async (
  id: string,
  name: string,
  profileImageUrl: string,
  token: string
) => {
  const data = await apiClient.put(
    `${END_POINT.user}/${id}`,
    {
      name,
      profileImageUrl,
    },
    {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }
  );
  return data;
};
