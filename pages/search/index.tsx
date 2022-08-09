import { Pagination, Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { getNaverBooks, registerBook } from "../../apis";
import { BookCard } from "../../components";
import type { NaverBookResponseType } from "../../types/bookType";
import * as S from "../../styles/SearchPageStyle";

const SearchPage = () => {
  const router = useRouter();
  const { word, page } = router.query;

  const [loading, setLoading] = useState(true);
  const [searchedInfo, setSearchedInfo] = useState({} as NaverBookResponseType);

  const handlePaginationChange = (_: ChangeEvent<unknown>, two: number) => {
    router.push({
      pathname: "/search",
      query: {
        word,
        page: two,
      },
    });
  };

  useEffect(() => {
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
    <>
      <S.BookCardContainer>
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
      </S.BookCardContainer>
      <S.PaginationWrapper>
        <Pagination
          count={Math.ceil(searchedInfo.total / 10)}
          variant="outlined"
          shape="rounded"
          color="primary"
          page={Number(router.query?.page)}
          onChange={handlePaginationChange}
        />
      </S.PaginationWrapper>
    </>
  );
};

export default SearchPage;
