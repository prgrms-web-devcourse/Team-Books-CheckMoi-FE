import { Divider } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BookDetail } from "../../components";
import type { BookType } from "../../types/bookType";
import type { StudyType } from "../../types/studyType";
import { StudyCardList } from "../../features";
import { getBookInfo } from "../../apis";
import { getStudies } from "../../apis/study";
import { useInView } from "../../hooks/useInView";

const Book = () => {
  const router = useRouter();
  const [bookInfo, setBookinfo] = useState({} as BookType);
  const [studies, setStudies] = useState<StudyType[]>([]);
  const [ref, inView] = useInView();
  const [pageState, setPageState] = useState({ pageNumber: 1, totalPage: 2 });
  const [loading, setLoading] = useState(false);
  // TODO 쿠키에서 jwt 토큰 가져와서 user 정보 가져오기, 해당 데이터로 스터디원 인지 검증 로직 필요
  
  useEffect(() => {
    const bookInfoFetch = async (id: string) => {
      setLoading(true);
      const bookData = await getBookInfo(id);
      setBookinfo(bookData);
      setLoading(false);
    };

    const { id } = router.query;

    if (id && typeof id === "string") bookInfoFetch(id);
  }, [router.query]);

  useEffect(() => {
    const studiesFetch = async (id: string, page = 1) => {
      setLoading(true);
      const data = await getStudies(id, page);
      const { studiesData, totalPage } = data;
      setStudies([...studies, ...studiesData]);
      setPageState({ ...pageState, totalPage });
      setLoading(false);
    };

    const { id } = router.query;
    if (id && typeof id === "string") studiesFetch(id, pageState.pageNumber);
  }, [router.query, pageState.pageNumber]);

  useEffect(() => {
    if (inView && !loading)
      setPageState({ ...pageState, pageNumber: pageState.pageNumber + 1 });
  }, [inView]);

  return (
    <div>
      <BookDetail
        id={bookInfo.id}
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
      {pageState.pageNumber !== pageState.totalPage ? <div ref={ref} /> : null}
    </div>
  );
};

export default Book;
