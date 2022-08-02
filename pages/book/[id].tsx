import { Box, Divider, Modal } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { BookDetail } from "../../components/BookDetailCard";
import { StudyCard } from "../../components/StudyCard";
import type { BookType } from "../../types/bookType";
import { StudyDetailType, StudyType } from "../../types/studyType";
import { StudyDetail } from "../../features/StudyDetail";
import * as S from "../../styles/bookPageStyle";

const Book = () => {
  const router = useRouter();
  const [bookInfo, setBookinfo] = useState<BookType>({});
  const [studies, setStudies] = useState<StudyType[]>([]);
  const [studyInfo, setStudyInfo] = useState<StudyDetailType>({});
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

    if (id)
      if (typeof id === "string") {
        // TODO api 붙이기 작업
        bookInfoFetch(id);
        studiesFetch(id, 1);
      }
  }, [router.query]);

  const handleStudyClick = async (
    e: MouseEvent<HTMLDivElement>,
    id: string | undefined
  ) => {
    const serverData = await fetch(`https://dev.checkmoi.ga/api/studies/${id}`);
    const { data } = await serverData.json();
    setStudyInfo({ ...data.study, members: data.members });
    setOpen(true);
  };

  return (
    <div>
      <BookDetail
        size={200}
        src={bookInfo.src}
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
            <StudyCard
              key={study.id}
              onClick={(e) => {
                handleStudyClick(e, study.id);
              }}
              name={study.name}
              studyStartDate={study.studyStartDate}
              studyEndDate={study.studyEndDate}
              gatherStartDate={study.gatherStartDate}
              gatherEndDate={study.gatherEndDate}
              currentParticipant={study.currentParticipant}
              maxParticipant={study.maxParticipant}
              thumbnailUrl=""
              size={128}
            />
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
          <StudyDetail
            members={studyInfo.members}
            description={studyInfo.description}
            name={studyInfo.name}
            thumbnailUrl=""
            currentParticipant={studyInfo.currentParticipant}
            maxParticipant={studyInfo.maxParticipant}
            gatherStartDate={studyInfo.gatherStartDate}
            gatherEndDate={studyInfo.gatherEndDate}
            studyStartDate={studyInfo.studyEndDate}
            studyEndDate={studyInfo.studyEndDate}
          />
        </S.StyledBox>
      </Modal>
    </div>
  );
};

export default Book;
