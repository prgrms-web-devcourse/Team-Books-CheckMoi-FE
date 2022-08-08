import { Box, Button, TextField, Typography } from "@mui/material";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getBookInfo } from "../../apis";
import { createStudy } from "../../apis/study";
import type { StudyType } from "../../types/studyType";
import { isValueNumber } from "../../utils/isValueNumber";
import * as S from "./style";

interface StudyOpenProps {
  bookId: string;
}

interface IStudyInfo {
  bookTitle: string;
  name: string;
  maxParticipant: string;
  gatherStartDate: string;
  gatherEndDate: string;
  studyStartDate: string;
  studyEndDate: string;
  description: string;
  thumbnail: string;
}

interface IInputError {
  name: string;
  maxParticipant: string;
  gatherStartDate: string;
  gatherEndDate: string;
  studyStartDate: string;
  studyEndDate: string;
  description: string;
}

export const StudyOpen = ({ bookId = "1" }: StudyOpenProps) => {
  const [studyInfo, setStudyInfo] = useState<IStudyInfo>({
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
  const [inputError, setInputError] = useState<IInputError>({
    name: "",
    maxParticipant: "",
    gatherStartDate: "",
    gatherEndDate: "",
    studyStartDate: "",
    studyEndDate: "",
    description: "",
  });

  useEffect(() => {
    const fetchBookInfo = async () => {
      const { title, image } = await getBookInfo(bookId);

      setStudyInfo({
        ...studyInfo,
        bookTitle: title,
        thumbnail: image,
      });
    };

    fetchBookInfo();
  }, []);

  const handleStudyInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = e.target;

    setStudyInfo({
      ...studyInfo,
      [inputName]: value,
    });

    console.log(studyInfo);
  };

  const handleOpenClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const newError: IInputError = {
      name: "",
      maxParticipant: "",
      gatherStartDate: "",
      gatherEndDate: "",
      studyStartDate: "",
      studyEndDate: "",
      description: "",
    };
    console.log(inputError);

    // TODO: participant 제한이 몇이었더라..?
    const LIMIT_PARTICIPANT = 10;
    const LIMIT_NAME = 30;

    if (!studyInfo.name) newError.name = "스터디 이름을 입력해주세요";
    else if (studyInfo.name.length > LIMIT_NAME)
      newError.name = "스터디 이름은 최대 30자입니다.";

    if (!studyInfo.maxParticipant)
      newError.maxParticipant = "정원을 입력해주세요";
    else if (Number(studyInfo.maxParticipant) > LIMIT_PARTICIPANT)
      newError.maxParticipant = `최대 ${LIMIT_PARTICIPANT}명까지 가능합니다.`;

    if (studyInfo.gatherStartDate >= studyInfo.gatherEndDate) {
      newError.gatherStartDate = "모집 시작을 다시 입력해주세요";
      newError.gatherEndDate = "모집 마감을 다시 입력해주세요";
    }
    if (studyInfo.gatherEndDate >= studyInfo.studyStartDate) {
      newError.gatherEndDate = "모집 마감을 다시 입력해주세요";
      newError.studyStartDate = "진행 시작을 다시 입력해주세요";
    }
    if (studyInfo.studyStartDate >= studyInfo.studyEndDate) {
      newError.studyStartDate = "진행 시작을 다시 입력해주세요";
      newError.studyEndDate = "진행 마감을 다시 입력해주세요";
    }

    if (!studyInfo.description)
      newError.description = "스터디 내용을 입력해주세요";

    setInputError({ ...newError });

    if (!Object.values(newError).every((errorVal) => errorVal === "")) return;

    const getForamttedDate = (yyyymmdd: string) => {
      return `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(
        6
      )}`;
    };

    const newStudyInfo: StudyType = {
      ...studyInfo,
      bookId,
      maxParticipant: Number(studyInfo.maxParticipant),
      currentParticipant: 1,
      gatherStartDate: getForamttedDate(studyInfo.gatherStartDate),
      gatherEndDate: getForamttedDate(studyInfo.gatherEndDate),
      studyStartDate: getForamttedDate(studyInfo.studyStartDate),
      studyEndDate: getForamttedDate(studyInfo.studyEndDate),
    };

    console.log(newStudyInfo);

    const study = await createStudy(newStudyInfo);

    console.log(study);

    // TODO: 스터디 개설 성공하면 해당 스터디 상세 페이지로 자동 라우팅
  };

  const hanldeUploadClick = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const reader = new FileReader();
    if (e.target.files) reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = () => {
      const resultImage = reader.result;
      setStudyInfo({ ...studyInfo, thumbnail: resultImage as string });
    };
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
        value={studyInfo.name}
        margin="dense"
        onChange={handleStudyInfoChange}
        error={!!inputError.name}
        helperText={inputError.name}
      />
      <TextField
        name="maxParticipant"
        variant="standard"
        type="number"
        label="스터디 인원"
        value={studyInfo.maxParticipant}
        margin="dense"
        onChange={handleStudyInfoChange}
        error={!!inputError.maxParticipant}
        helperText={inputError.maxParticipant}
      />
      <TextField
        name="gatherStartDate"
        variant="standard"
        type="date"
        defaultValue=""
        label="스터디원 모집 시작"
        value={studyInfo.gatherStartDate}
        margin="dense"
        onChange={handleStudyInfoChange}
        error={!!inputError.gatherStartDate}
        helperText={inputError.gatherStartDate}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="gatherEndDate"
        variant="standard"
        type="date"
        label="스터디원 모집 마감"
        value={studyInfo.gatherEndDate}
        margin="dense"
        onChange={handleStudyInfoChange}
        error={!!inputError.gatherEndDate}
        helperText={inputError.gatherEndDate}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="studyStartDate"
        variant="standard"
        type="date"
        label="스터디 진행 시작"
        value={studyInfo.studyStartDate}
        margin="dense"
        onChange={handleStudyInfoChange}
        error={!!inputError.studyStartDate}
        helperText={inputError.studyStartDate}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="studyEndDate"
        variant="standard"
        type="date"
        label="스터디 진행 종료"
        value={studyInfo.studyEndDate}
        margin="dense"
        onChange={handleStudyInfoChange}
        error={!!inputError.studyEndDate}
        helperText={inputError.studyEndDate}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="description"
        variant="outlined"
        label="스터디 내용"
        multiline
        minRows={8}
        value={studyInfo.description}
        margin="dense"
        onChange={handleStudyInfoChange}
        error={!!inputError.description}
        helperText={inputError.description}
      />
      <S.ThumbnailForm>
        <S.ThumbnailTypo>스터디 썸네일</S.ThumbnailTypo>
        <S.ThumbnailLabel htmlFor="fileInput">
          <S.ImageBox>
            <Image src={studyInfo.thumbnail} width="480px" height="480px" />
          </S.ImageBox>
        </S.ThumbnailLabel>
        <input
          hidden
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={hanldeUploadClick}
        />
      </S.ThumbnailForm>
      <Button variant="outlined" onClick={handleOpenClick}>
        스터디 개설하기
      </Button>
    </S.Container>
  );
};
