import { apiClient } from "./api";
import { END_POINT } from ".";

interface IPostImage {
  urls: string[];
}

export const postImage = async (token: string, file: Blob) => {
  const formData = new FormData();
  formData.append("files", file);

  const { urls } = await apiClient.post<IPostImage, IPostImage>(
    `${END_POINT.image}`,
    formData,
    {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  const imageUrl = urls[0]
  return imageUrl;
};
