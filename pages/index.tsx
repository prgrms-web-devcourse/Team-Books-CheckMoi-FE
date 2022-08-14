import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Slider from "react-slick";
import { BookCard } from "../components/BookCard";
import type { BookType, V2BookType } from "../types/bookType";
import * as S from "../styles/MainPageStyle";
import { HomeUI } from "../features/HomeUI";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useWindowSize from "../hooks/useWindowSize";
import { apiSSR, END_POINT } from "../apis";

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
        infinite
        pauseOnHover
        autoplaySpeed={4000}
        speed={2000}
        slidesToShow={width <= 768 ? (width <= 512 ? 2 : 3) : 5}
        slidesToScroll={width <= 768 ? (width <= 512 ? 2 : 3) : 5}
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
        infinite
        pauseOnHover
        autoplaySpeed={4000}
        speed={2000}
        slidesToShow={width <= 768 ? (width <= 512 ? 2 : 3) : 5}
        slidesToScroll={width <= 768 ? (width <= 512 ? 2 : 3) : 5}
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
    const { books: studyLatestBooks } = await apiSSR.get<
      V2BookType,
      V2BookType
    >(`${END_POINT.v2_books}?latestStudy=true&size=10`);
    const { books: mostStudyBooks } = await apiSSR.get<V2BookType, V2BookType>(
      `${END_POINT.v2_books}?mostStudy=true&size=10`
    );

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
