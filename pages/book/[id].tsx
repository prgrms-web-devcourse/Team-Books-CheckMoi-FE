import { Divider } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  BookDetail,
  BookDetailSkeleton,
  StudyCardSkeleton,
} from "../../components";
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

  const id = Number(router.query.id as string);

  useEffect(() => {
    const bookInfoFetch = async () => {
      setLoading(true);
      const bookData = await getBookInfo(id);
      setBookinfo(bookData);
      setLoading(false);
    };

    if (id) bookInfoFetch();
  }, [router.query]);

  useEffect(() => {
    const studiesFetch = async (page = 1) => {
      setLoading(true);
      const data = await getStudies(id, page);
      const { studiesData, totalPage } = data;
      setStudies([...studies, ...studiesData]);
      setPageState({ ...pageState, totalPage });
      setLoading(false);
    };

    if (id) studiesFetch(pageState.pageNumber);
  }, [router.query, pageState.pageNumber]);

  useEffect(() => {
    if (inView && !loading)
      setPageState({ ...pageState, pageNumber: pageState.pageNumber + 1 });
  }, [inView]);

  return (
    <div>
      {loading ? (
        <>
          <BookDetailSkeleton size={208} />
          <Divider color="black" />
          <br />
          <StudyCardSkeleton />
        </>
      ) : (
        <>
          <BookDetail size={200} book={bookInfo} />
          <Divider color="black" />
          <StudyCardList studies={studies} />
          {pageState.pageNumber !== pageState.totalPage ? (
            <div ref={ref} />
          ) : null}
        </>
      )}
    </div>
  );
};

export default Book;
