import { Box, Button, Input, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getBookInfo } from "../../apis";
import { createStudy } from "../../apis/study";
import type { StudyType } from "../../types/studyType";
import * as S from "./style";

interface StudyOpenProps {
  bookId: string;
}

export const StudyOpen = ({ bookId = "1" }: StudyOpenProps) => {
  const [studyInfo, setStudyInfo] = useState({
    bookTitle: "",
    name: "",
    maxParticipant: "",
    gatherStartDate: "",
    gatherEndDate: "",
    studyStartDate: "",
    studyEndDate: "",
    description: "",
    thumbnail: "",
  });

  useEffect(() => {
    const fetchBookInfo = async () => {
      const bookInfo = await getBookInfo(bookId);

      setStudyInfo({
        ...studyInfo,
        bookTitle: bookInfo.title,
        thumbnail: bookInfo.image,
      });
    };

    fetchBookInfo();
  }, []);

  const handleStudyInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyInfo({
      ...studyInfo,
      [e.target.name]: e.target.value,
    });

    console.log(studyInfo);
  };

  const handleOpenClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const newStudyInfo: StudyType = {
      ...studyInfo,
      maxParticipant: Number(studyInfo.maxParticipant),
      currentParticipant: 1,
      bookId,
    };

    const study = await createStudy(newStudyInfo);

    console.log(study);
  };

  return (
    <S.Container>
      <TextField
        name="bookTitle"
        variant="standard"
        label="책 제목"
        disabled
        value={studyInfo.bookTitle}
        margin="dense"
      />
      <TextField
        name="name"
        variant="standard"
        label="스터디 이름"
        placeholder="hello"
        value={studyInfo.name}
        margin="dense"
        onChange={handleStudyInfoChange}
      />
      <TextField
        name="maxParticipant"
        variant="standard"
        label="스터디 인원"
        value={studyInfo.maxParticipant}
        margin="dense"
        onChange={handleStudyInfoChange}
      />
      <Box component="form">
        <TextField
          name="gatherStartDate"
          variant="standard"
          label="스터디원 모집 시작"
          value={studyInfo.gatherStartDate}
          margin="dense"
          onChange={handleStudyInfoChange}
        />
        -
        <TextField
          name="gatherEndDate"
          variant="standard"
          label="스터디원 모집 마감"
          value={studyInfo.gatherEndDate}
          margin="dense"
          onChange={handleStudyInfoChange}
        />
      </Box>
      <Box component="form">
        <TextField
          name="studyStartDate"
          variant="standard"
          label="스터디 진행 시작"
          value={studyInfo.studyStartDate}
          margin="dense"
          onChange={handleStudyInfoChange}
        />
        -
        <TextField
          name="studyEndDate"
          variant="standard"
          label="스터디 진행 종료"
          value={studyInfo.studyEndDate}
          margin="dense"
          onChange={handleStudyInfoChange}
        />
      </Box>
      <TextField
        name="description"
        variant="outlined"
        label="스터디 내용"
        multiline
        value={studyInfo.description}
        margin="dense"
        onChange={handleStudyInfoChange}
      />
      <Input
        name="thumbnail"
        value={studyInfo.thumbnail}
        onChange={handleStudyInfoChange}
      />
      <Button onClick={handleOpenClick}>개설하기</Button>
    </S.Container>
  );
};
