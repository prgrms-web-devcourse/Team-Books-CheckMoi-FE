import { apiClient } from "./api";
import { END_POINT } from ".";

interface IPostImage {
  file: Blob;
}
interface PostImageResponse {
  urls: string[];
}

export const postImage = async ({ file }: IPostImage) => {
  const formData = new FormData();
  formData.append("files", file);

  const { urls } = await apiClient.post<PostImageResponse, PostImageResponse>(
    `${END_POINT.image}`,
    formData
  );
  const imageUrl = urls[0];
  return imageUrl;
};
