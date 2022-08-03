import type { GetServerSideProps } from "next";
import axios from "axios";
import { BookCard } from "../components/BookCard";
import type { BookDataInterface } from "../types/testType";
import * as S from "../styles/MainPageStyle";

interface ServerSidePropsType {
  books: {
    latestBooks: BookDataInterface[];
    studyLatestBooks: BookDataInterface[];
  };
}

const Home = ({ books }: ServerSidePropsType) => {
  const { latestBooks, studyLatestBooks } = books;
  const handleBookCardClick = () => {
    // TODO 책 클릭 시 상세 페이지로 이동!
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
              onClick={handleBookCardClick}
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
              onClick={handleBookCardClick}
            />
          </S.StyledList>
        ))}
      </S.StyledUl>
    </S.MainPageWrapper>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // TODO status 200이 아닐 때 Client로 전달할 prop과 API호출 실패시 전달할 prop 정의 필요

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_END_POINT}/books`
    );

    if (res.status === 200) {
      const books = res.data.data;
      return { props: { books } };
    }
    return { props: {} };
  } catch (error) {
    return { props: {} };
  }
};
