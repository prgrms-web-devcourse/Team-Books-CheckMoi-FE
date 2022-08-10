import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { getNaverBooks, registerBook } from "../../apis";
import { BookCard } from "../../components";
import type {
  NaverBookResponseType,
  NaverBookType,
} from "../../types/bookType";
import * as S from "../../styles/SearchPageStyle";
import { getBookInfoByISBN } from "../../apis/book";
import type { ErrorResponseType } from "../../types/errorTypes";
import { useOurSnackbar } from "../../hooks/useOurSnackbar";
import { useUserContext } from "../../hooks/useUserContext";
import type { TopbarUserType } from "../../types/userType";
import { SearchPageModal } from "../../features/SearchPageModal";

const SEARCH_URL = "/search";

const SearchPage = () => {
  const router = useRouter();
  const { word, page } = router.query;

  const [loading, setLoading] = useState(true);
  const [searchedInfo, setSearchedInfo] = useState({} as NaverBookResponseType);
  const [isSearchPageModalOpen, setIsSearchPageModalOpen] = useState(false);

  const { renderSnackbar } = useOurSnackbar();
  const { user } = useUserContext();

  const addBook = async (
    inputUser: TopbarUserType | null,
    book: NaverBookType
  ) => {
    if (!inputUser) {
      setIsSearchPageModalOpen(true);
      return;
    }

    const [_, token] = document.cookie.split("token=");
    const registeredBookId = await registerBook(book, token);
    router.push(`/book/${registeredBookId}`);
  };

  const handleBookCardClick = async (book: NaverBookType) => {
    try {
      const { id } = await getBookInfoByISBN(book.isbn);
      router.push(`/book/${id}`);
    } catch (error) {
      const err = error as ErrorResponseType;
      if (err.response?.status === 404) {
        addBook(user, book);
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

  const handleSearchPageModalClose = () => {
    setIsSearchPageModalOpen(false);
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
                onClick={() => handleBookCardClick(book)}
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
      <SearchPageModal
        open={isSearchPageModalOpen}
        onClose={handleSearchPageModalClose}
      />
    </>
  );
};

export default SearchPage;
