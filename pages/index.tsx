import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { BookCard } from "../components/BookCard";
import type { BookAllType } from "../types/bookType";
import * as S from "../styles/MainPageStyle";
import { getBooksList } from "../apis";

interface ServerSidePropsType {
  books: {
    latestBooks: BookAllType[];
    studyLatestBooks: BookAllType[];
  };
}

const Home = ({ books }: ServerSidePropsType) => {
  const router = useRouter();
  const { latestBooks, studyLatestBooks } = books;

  const handleBookCardClick = (id: number) => {
    router.push(`/book/${id}`);
  };

  return (
    <S.MainPageWrapper>
      <S.StyledSpan>가장 최근 추가된 책</S.StyledSpan>
      <S.StyledUl>
        {latestBooks.map((book) => (
          <S.StyledList key={book.id}>
            <BookCard
              src={book.image}
              title=""
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
              title=""
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
    const books = await getBooksList();
    return { props: { books } };
  } catch (error) {
    return {
      props: {
        books: {
          latesBooks: [],
          studyLatestBooks: [],
        },
      },
    };
  }
};
