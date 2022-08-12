import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { BookCard } from "../components/BookCard";
import type { BookType } from "../types/bookType";
import * as S from "../styles/MainPageStyle";
import { HomeUI } from "../features/HomeUI";
import { getBooksByLatestStudy, getBooksByMostStudy } from "../apis/book";

interface ServerSidePropsType {
  books: {
    studyLatestBooks: BookType[];
    mostStudyBooks: BookType[];
  };
}

const Home = ({ books }: ServerSidePropsType) => {
  const router = useRouter();
  const { studyLatestBooks, mostStudyBooks } = books;

  const handleBookCardClick = (id: number) => {
    router.push(`/book/${id}`);
  };

  return (
    <S.MainPageWrapper>
      <HomeUI />
      <S.StyledSpan>가장 많은 스터디가 개설된 책</S.StyledSpan>
      <S.StyledUl>
        {mostStudyBooks.map((book) => (
          <S.StyledList key={book.id}>
            <BookCard
              src={book.image}
              title={book.title}
              size={10}
              onClick={() => handleBookCardClick(book.id)}
            />
          </S.StyledList>
        ))}
      </S.StyledUl>

      <S.StyledSpan>가장 최근 스터디가 만들어진 책</S.StyledSpan>
      <S.StyledUl>
        {studyLatestBooks.map((book) => (
          <S.StyledList key={book.id}>
            <BookCard
              src={book.image}
              title={book.title}
              size={10}
              onClick={() => handleBookCardClick(book.id)}
            />
          </S.StyledList>
        ))}
      </S.StyledUl>
    </S.MainPageWrapper>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const studyLatestBooks = await getBooksByLatestStudy();
    const mostStudyBooks = await getBooksByMostStudy();

    return {
      props: {
        books: {
          studyLatestBooks,
          mostStudyBooks,
        },
      },
    };
  } catch (error) {
    return {
      props: {
        books: {
          studyLatestBooks: [],
          mostStudyBooks: [],
        },
      },
    };
  }
};
