import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getNaverBooks,
  getBooksList,
  registerBook,
  getBookInfo,
} from "../apis";
import styles from "../styles/Home.module.css";
import { Book } from "../types/bookType";

const Home: NextPage = () => {
  const [books, setBooks] = useState("");

  const fetchBooks = async () => {
    const data = await getNaverBooks("타입 스크립트");
    console.log(data);

    setBooks(data.items);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    console.log(books);
  }, [books]);

  const handleBooksClick = async (e: MouseEvent<HTMLElement>) => {
    const data = await getBooksList();

    console.log(data);
  };

  const handleRegisterClick = async (e: MouseEvent<HTMLElement>) => {
    // 이건 이미 있는 데이터라 에러가 날겁니다.
    // title, isbn 살짝 바꿔서 넣어주세요
    const dummyBook: Book = {
      pubdate: "20021010",
      title: "대왕고래3",
      image: "abc/foo.png",
      author: "큰그림",
      publisher: "Hanbit",
      isbn: "1231231231233",
      description: "대왕고래와 아기고래가 함께 살았어요",
    };

    // 토큰 만료되면 직접 새로 발급 받으셔야합니다.
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiTE9HSU4iLCJ1c2VySWQiOjMsImlhdCI6MTY1OTQxOTE3NSwiZXhwIjoxNjU5NDIyNzc1fQ.rpNwmWcfyTycKZ9G-i3MPM1xktm2v_4sQjaOU-z08Yg";

    const data = await registerBook(dummyBook, token);

    console.log(data);
  };

  const handleBookInfoClick = async (e: MouseEvent<HTMLElement>) => {
    // 0 없고, 1 부터 있습니다.
    const data = await getBookInfo("0");

    console.log(data);
  };

  return (
    <div>
      <div>hello</div>
      <button type="button" onClick={handleBooksClick}>
        bookList
      </button>
      <button type="button" onClick={handleRegisterClick}>
        register
      </button>
      <button type="button" onClick={handleBookInfoClick}>
        one book info
      </button>
    </div>
  );
};

export default Home;
