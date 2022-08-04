import { Divider } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BookDetail } from "../../components";
import type { BookType } from "../../types/bookType";
import type { StudyType } from "../../types/studyType";
import { StudyCardList } from "../../features";

const Book = () => {
  const router = useRouter();
  const [bookInfo, setBookinfo] = useState<BookType>({} as BookType);
  const [studies, setStudies] = useState<StudyType[]>([]);
  // TODO 쿠키에서 jwt 토큰 가져와서 user 정보 가져오기, 해당 데이터로 스터디원 인지 검증 로직 필요

  useEffect(() => {
    const bookInfoFetch = async (id: string) => {
      const serverData = await fetch(
        `${process.env.NEXT_PUBLIC_API_END_POINT}/books/${id}`
      );
      const { data } = await serverData.json();

      setBookinfo(data);
    };

    const studiesFetch = async (id: string, page = 1) => {
      const serverData = await fetch(
        `${process.env.NEXT_PUBLIC_API_END_POINT}/studies?bookId=${id}&size=8&page=${page}`
      );
      const { data } = await serverData.json();
      setStudies(data.studies.content);
    };

    const { id } = router.query;

    if (id && typeof id === "string") {
      // TODO api 붙이기 작업

      bookInfoFetch(id);
      studiesFetch(id, 1);
    }
  }, [router.query]);

  return (
    <div>
      <BookDetail
        size={200}
        src={bookInfo.image}
        title={bookInfo.title}
        author={bookInfo.author}
        publisher={bookInfo.publisher}
        pubdate={bookInfo.pubdate}
        description={bookInfo.description}
        isbn={bookInfo.isbn}
      />

      <Divider color="black" />
      <StudyCardList studies={studies} />
    </div>
  );
};

export default Book;
