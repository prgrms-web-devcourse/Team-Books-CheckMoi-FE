import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { getNaverBooks } from "../../apis";
import { BookCard } from "../../components";
import type { NaverBookResponseType } from "../../types/bookType";
import * as S from "../../styles/SearchPageStyle";
import { getBookInfoByISBN } from "../../apis/book";
import type { ErrorResponseType } from "../../types/errorTypes";
import { useOurSnackbar } from "../../hooks/useOurSnackbar";

const SEARCH_URL = "/search";

const SearchPage = () => {
  const router = useRouter();
  const { word, page } = router.query;

  const [loading, setLoading] = useState(true);
  const [searchedInfo, setSearchedInfo] = useState({} as NaverBookResponseType);

  const { renderSnackbar } = useOurSnackbar();

  const handleBookCardClick = async (isbn: string) => {
    try {
      const { id } = await getBookInfoByISBN(isbn);
      router.push(`/book/${id}`);
    } catch (error) {
      const err = error as ErrorResponseType;
      if (err.response?.status === 404) {
        renderSnackbar("이 책은 등록되지 않았습니다", "warning");
        return;
      }
      renderSnackbar(
        "알 수 없는 오류로 책 정보를 받아오지 못했습니다",
        "error"
      );
    }
  };

  const handlePaginationChange = (_: ChangeEvent<unknown>, two: number) => {
    router.push({
      pathname: SEARCH_URL,
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
                onClick={() => handleBookCardClick(book.isbn)}
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
