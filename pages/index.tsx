import type { NextPage } from "next";
import { BookCard } from "../components/BookCard";

// TODO: BookCard 컴포넌트 가져오기 -> src, title, size, onClick 함수 만들기
// TODO: 책 관련 백엔드 API 확인 및 검증 -> 현재 책 등록 API에 문제가 있어서 더미데이터로 사용해야 함...
// TODO: 백엔드 DB 사용전 더미 데이터 사용해서 map 실행
// TODO: 최신 등록 기준으로 (스터디는 불가능 할 듯 현재로서) 정렬하기

const DUMMY_BOOKS = [{}, {}, {}, {}, {}, {}, {}, {}];

const Home: NextPage = () => {
  const handleBookCardClick = () => {
    console.log("BookCard Click!");
  };
  return (
    <BookCard
      src="https://i.picsum.photos/id/962/200/300.jpg?hmac=wvuv8EVOoNE5J3sBkBx-1wcVHNbgJ_Z1dS98YhnShjM"
      title="Test"
      size={10}
      onClick={handleBookCardClick}
    />
  );
};

export default Home;
