import axios from "axios";
import type { NaverBookResponseType } from "../types/bookType";

export const getNaverBooks = async (query: string, start = 1) => {
  try {
    const res = await axios.get<NaverBookResponseType>("/naver", {
      params: {
        query,
        start,
      },
      headers: {
        "X-Naver-Client-Id": process.env
          .NEXT_PUBLIC_X_NAVER_CLIENT_ID as string,
        "X-Naver-Client-Secret": process.env
          .NEXT_PUBLIC_X_NAVER_CLIENT_SECRET as string,
      },
    });

    if (res.status === 200) return res.data;

    throw new Error("getBooksByTitlte error");
  } catch (error) {
    return error;
  }
};
