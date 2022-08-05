import axios from "axios";
import { END_POINT } from ".";

export const fakeLogin = async () => {
  const data = await axios.get<string>(
    `${process.env.NEXT_PUBLIC_API_END_POINT}${END_POINT.fakeLogin}`
  );

  return data.data;
};
