import { apiClient } from "./api";
import { END_POINT } from ".";

interface IPostImage {
  token: string;
  file: Blob;
}
interface PostImageResponse {
  urls: string[];
}

export const postImage = async ({ token, file }: IPostImage) => {
  const formData = new FormData();
  formData.append("files", file);

  const { urls } = await apiClient.post<PostImageResponse, PostImageResponse>(
    `${END_POINT.image}`,
    formData,
    {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  const imageUrl = urls[0];
  return imageUrl;
};
