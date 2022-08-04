import { Divider, Modal } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BookDetail, StudyCard, Spacer } from "../../components";
import type { BookType } from "../../types/bookType";
import type { StudyType } from "../../types/studyType";
import { StudyDetail } from "../../features/StudyDetail";
import * as S from "../../styles/bookPageStyle";

const Book = () => {
  const router = useRouter();
  const [bookInfo, setBookinfo] = useState<BookType>({} as BookType);
  const [studies, setStudies] = useState<StudyType[]>([]);
  const [selectedId, setSelectedId] = useState("");
  // TODO 쿠키에서 jwt 토큰 가져와서 user 정보 가져오기, 해당 데이터로 스터디원 인지 검증 로직 필요

  const [open, setOpen] = useState(false);

  const handleCloseClick = () => setOpen(false);

  useEffect(() => {
    const bookInfoFetch = async (id: string) => {
      const serverData = await fetch(`https://dev.checkmoi.ga/api/books/${id}`);
      const { data } = await serverData.json();

      setBookinfo(data);
    };

    const studiesFetch = async (id: string, page = 1) => {
      const serverData = await fetch(
        `https://dev.checkmoi.ga/api/studies?bookId=${id}&size=8&page=${page}`
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

  const handleStudyClick = (id: string | undefined) => {
    setSelectedId(id as string);
    setOpen(!open);
  };

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
      <S.StudyCardContainer>
        {studies.map((study) => {
          return (
            <Spacer size={1}>
              <StudyCard
                key={study.id}
                onClick={() => {
                  handleStudyClick(study.id);
                }}
                study={study}
                size={128}
              />
            </Spacer>
          );
        })}
      </S.StudyCardContainer>

      <Modal
        open={open}
        onClose={handleCloseClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEnforceFocus
      >
        <S.StyledBox>
          <StudyDetail open={open} id={selectedId} />
        </S.StyledBox>
      </Modal>
    </div>
  );
};

export default Book;
