import { apiClient } from "./api";
import { END_POINT } from ".";

export const postImage = async (token: string, file: Blob) => {
  const formData = new FormData();
  formData.append("files", file);

  interface Itemp {
    urls: string[];
  }

  const { urls } = await apiClient.post<Itemp, Itemp>(
    `${END_POINT.image}`,
    formData,
    {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return urls[0];
};
