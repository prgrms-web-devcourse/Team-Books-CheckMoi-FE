import type { GetServerSideProps } from "next";
import type { MouseEvent } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import type { BookDataInterface } from "../types/testType";
import { BookCard } from "../components/BookCard";
import * as S from "../styles/MainPageStyle";

interface ServerSidePropsType {
  books: {
    latestBooks: BookDataInterface[];
    studyLatestBooks: BookDataInterface[];
  };
}

const Home = ({ books }: ServerSidePropsType) => {
  const router = useRouter();
  const { latestBooks, studyLatestBooks } = books;

  const handleBookCardClick = (e: MouseEvent<HTMLElement>) => {
    // TODO 책 클릭 시 상세 페이지로 이동!
    // TODO 클릭 시 id 값을 얻어와야 한다.
    // TODO BookCard에 onClick 콜백을 전달하면, 내부에서 id값을 알 수 없기 때문에 사용 불가.
    // TODO List에서 클릭시 이동하는 방향으로 수정해야 할듯?
  };

  const handleBookCardListClick = (key: number, e: MouseEvent<HTMLElement>) => {
    router.push(`/book/${key}`);
  };

  return (
    <S.MainPageWrapper>
      <S.StyledSpan>가장 최근 추가된 책</S.StyledSpan>
      <S.StyledUl>
        {latestBooks.map((book) => (
          <S.StyledList
            key={book.id}
            onClick={(e) => handleBookCardListClick(book.id, e)}
          >
            <BookCard
              id={book.id}
              src={book.image}
              title=""
              size={10}
              onClick={() => {}}
            />
          </S.StyledList>
        ))}
      </S.StyledUl>

      <S.StyledSpan>가장 최근 스터디가 만들어진 책</S.StyledSpan>
      <S.StyledUl>
        {studyLatestBooks.map((book) => (
          <S.StyledList
            key={book.id}
            onClick={(e) => handleBookCardListClick(book.id, e)}
          >
            <BookCard
              id={book.id}
              src={book.image}
              title=""
              size={10}
              onClick={() => {}}
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
