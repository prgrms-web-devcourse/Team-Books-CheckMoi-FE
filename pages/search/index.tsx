import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getNaverBooks, registerBook } from "../../apis";
import { BookCard } from "../../components";
import { NaverBookType } from "../../types/bookType";

const SearchPage = () => {
  const router = useRouter();
  const { word } = router.query;

  const [bookList, setBookList] = useState<NaverBookType[] | null>(null);

  useEffect(() => {
    if (word)
      getNaverBooks(word as string).then((response) => {
        console.log(response);
        setBookList(response.items);
      });
  }, [word]);

  return bookList ? (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      {bookList.map((book) => (
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
      ))}
    </Box>
  ) : (
    "로딩 중"
  );
};

export default SearchPage;
