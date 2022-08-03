import axios from "axios";

// (네이버에서 계산한) 유사도에 의한 책 조회
// title, author, isbn 등...
export const getNaverBooks = async (query: string, count = 10, offset = 1) => {
  try {
    const res = await axios.get("/naver", {
      params: {
        query,
        display: count,
        start: offset,
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
    console.error(error);
    return error;
  }
};
