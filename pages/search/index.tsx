import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getNaverBooks, registerBook } from "../../apis";
import { BookCard } from "../../components";
import type { NaverBookResponseType } from "../../types/bookType";

const SearchPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [searchedInfo, setSearchedInfo] = useState({} as NaverBookResponseType);

  useEffect(() => {
    const { word, page } = router.query;
    if (!word) return;

    const searchNaverBook = async () => {
      setLoading(true);
      const data = (await getNaverBooks(
        word as string,
        (Number(page) - 1) * 10 + 1
      )) as NaverBookResponseType;
      setSearchedInfo(data);
      setLoading(false);
    };
    searchNaverBook();
  }, [router.query]);

  return loading ? (
    "로딩 중"
  ) : (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      {searchedInfo.items.length
        ? searchedInfo.items.map((book) => (
            <BookCard
              key={book.isbn}
              src={book.image}
              title={book.title}
              size={10}
              onClick={() => {
                registerBook(
                  book,
                  process.env.NEXT_PUBLIC_FAKE_TOKEN as string
                ).then((response) => {
                  console.log(response);
                  router.push(`/book/${response}`);
                });
              }}
            />
          ))
        : "검색 결과가 없습니다"}
    </Box>
  );
};

export default SearchPage;
