import { apiClient } from "./api";
import { END_POINT } from ".";

export const postImage = async (token: string, file: Blob) => {
  const formData = new FormData();
  formData.append("files", file);
  const { data } = await apiClient.post(`${END_POINT.image}`, formData, {
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return data.data.urls[0];
};
