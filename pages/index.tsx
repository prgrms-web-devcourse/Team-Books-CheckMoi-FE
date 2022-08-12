import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Slider from "react-slick";
import { BookCard } from "../components/BookCard";
import type { BookType } from "../types/bookType";
import * as S from "../styles/MainPageStyle";
import { HomeUI } from "../features/HomeUI";
import { getBooksByLatestStudy, getBooksByMostStudy } from "../apis/book";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useWindowSize from "../hooks/useWindowSize";

interface ServerSidePropsType {
  books: {
    studyLatestBooks: BookType[];
    mostStudyBooks: BookType[];
  };
}

const Home = ({ books }: ServerSidePropsType) => {
  const router = useRouter();
  const { studyLatestBooks, mostStudyBooks } = books;

  const { width } = useWindowSize();

  const handleBookCardClick = (id: number) => {
    router.push(`/book/${id}`);
  };

  return (
    <S.MainPageWrapper>
      <HomeUI />
      <S.StyledSpan>가장 많은 스터디가 개설된 책</S.StyledSpan>
      <Slider
        dots
        autoplay
        pauseOnHover
        speed={500}
        slidesToShow={width <= 512 ? 2 : 5}
        slidesToScroll={width <= 512 ? 2 : 5}
      >
        {mostStudyBooks.map((book) => (
          <BookCard
            key={book.id}
            src={book.image}
            title={book.title}
            size={10}
            onClick={() => handleBookCardClick(book.id)}
          />
        ))}
      </Slider>
      <S.StyledSpan>가장 최근 스터디가 만들어진 책</S.StyledSpan>
      <Slider
        dots
        autoplay
        pauseOnHover
        speed={500}
        slidesToShow={width <= 512 ? 2 : 5}
        slidesToScroll={width <= 512 ? 2 : 5}
      >
        {studyLatestBooks.map((book) => (
          <BookCard
            key={book.id}
            src={book.image}
            title={book.title}
            size={10}
            onClick={() => handleBookCardClick(book.id)}
          />
        ))}
      </Slider>
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
