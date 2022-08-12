import { MenuItem, TextField } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  getBookInfo,
  createStudy,
  getStudyDetailInfo,
  updateStudy,
  postImage,
} from "../../apis";
import { NoAccess } from "../../components/NoAccess";
import { useOurSnackbar } from "../../hooks/useOurSnackbar";
import { useUserContext } from "../../hooks/useUserContext";
import { StudyStatusType } from "../../types/studyType";
import * as S from "./style";

interface StudyOpenProps {
  bookId: string;
  studyId?: string;
}

interface IStudyInfo {
  bookTitle: string;
  name: string;
  maxParticipant: number;
  gatherStartDate: string;
  gatherEndDate: string;
  studyStartDate: string;
  studyEndDate: string;
  description: string;
  thumbnail: string;
  status: StudyStatusType;
}

interface IInputError {
  name: string;
  maxParticipant: string;
  gatherStartDate: string;
  gatherEndDate: string;
  studyStartDate: string;
  studyEndDate: string;
  description: string;
  status: string;
}

const getDateFromToday = (count: number = 0): string => {
  const today = new Date();

  const returnDate = new Date(today);

  returnDate.setDate(today.getDate() + count);

  return returnDate.toISOString().slice(0, 10);
};

const STATUS = {
  recruiting: "모집 중",
  recruitingFinished: "모집 완료",
  inProgress: "스터디 진행 중",
  finished: "스터디 완료",
};

export const StudyOpen = ({ bookId, studyId }: StudyOpenProps) => {
  const [studyInfo, setStudyInfo] = useState<IStudyInfo>({
    bookTitle: "",
    name: "",
    maxParticipant: 10,
    gatherStartDate: getDateFromToday(),
    gatherEndDate: getDateFromToday(1),
    studyStartDate: getDateFromToday(2),
    studyEndDate: getDateFromToday(3),
    description: "",
    thumbnail: "",
    status: "recruiting",
  });
  const [inputError, setInputError] = useState<IInputError>({
    name: "",
    maxParticipant: "",
    gatherStartDate: "",
    gatherEndDate: "",
    studyStartDate: "",
    studyEndDate: "",
    description: "",
    status: "",
  });
  const [isOwner, setIsOwner] = useState(true);
  const { user } = useUserContext();

  const router = useRouter();
  const { renderSnackbar } = useOurSnackbar();

  useEffect(() => {
    const fetchBookInfo = async () => {
      const { title, image } = await getBookInfo(bookId);

      setStudyInfo({
        ...studyInfo,
        bookTitle: title,
        thumbnail: image,
      });
    };

    const fetchStudyInfo = async () => {
      const { study, book, members } = await getStudyDetailInfo(studyId || "");
      const {
        name,
        thumbnail,
        description,
        status,
        maxParticipant,
        gatherStartDate,
        gatherEndDate,
        studyStartDate,
        studyEndDate,
      } = study;
      const { title: bookTitle } = book;

      setIsOwner(user?.id === members[0].user.id || false);

      setStudyInfo({
        ...studyInfo,
        bookTitle,
        name,
        thumbnail,
        description,
        status: status || "recruiting", // TODO: 에러 핸들링 수정 예정
        maxParticipant,
        gatherStartDate: gatherStartDate.replaceAll("/", "-"),
        gatherEndDate: gatherEndDate.replaceAll("/", "-"),
        studyStartDate: studyStartDate.replaceAll("/", "-"),
        studyEndDate: studyEndDate.replaceAll("/", "-"),
      } as IStudyInfo);
    };

    if (!studyId) fetchBookInfo();
    else fetchStudyInfo();
  }, []);

  const handleStudyInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value } = e.target;

    setStudyInfo({
      ...studyInfo,
      [inputName]: value,
    });
  };

  const handleOpenClick = async () => {
    const newError: IInputError = {
      name: "",
      maxParticipant: "",
      gatherStartDate: "",
      gatherEndDate: "",
      studyStartDate: "",
      studyEndDate: "",
      description: "",
      status: "",
    };

    const LIMIT_PARTICIPANT = 10;
    const LIMIT_NAME = 30;

    if (!studyInfo.name) newError.name = "스터디 이름을 입력해주세요";
    else if (studyInfo.name.length > LIMIT_NAME)
      newError.name = "스터디 이름은 최대 30자입니다.";

    if (!studyId) {
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
    }

    if (!studyInfo.description)
      newError.description = "스터디 내용을 입력해주세요";

    setInputError({ ...newError });

    if (!Object.values(newError).every((errorVal) => errorVal === "")) return;

    const newStudyInfo = {
      ...studyInfo,
      bookId: Number(bookId),
      maxParticipant: Number(studyInfo.maxParticipant),
      currentParticipant: 1,
      gatherStartDate: studyInfo.gatherStartDate,
      gatherEndDate: studyInfo.gatherEndDate,
      studyStartDate: studyInfo.studyStartDate,
      studyEndDate: studyInfo.studyEndDate,
      thumbnail: studyInfo.thumbnail,
    };

    try {
      const [, token] = document.cookie.split("token=");

      if (!studyId) {
        const newStudyId = await createStudy({ newStudyInfo, token });

        router.push({
          pathname: `/study/${newStudyId}`,
        });
      } else {
        await updateStudy({ studyId, newStudyInfo, token });

        router.push({
          pathname: `/study/${studyId}`,
        });
      }
    } catch (error) {
      if (!studyId) renderSnackbar("스터디 개설에 실패했습니다.", "error");
      else renderSnackbar("스터디 수정에 실패했습니다.", "error");
    }
  };

  const hanldeUploadClick = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      (async () => {
        const newImageUrl = await postImage({
          file,
          token: document.cookie.split("token=")[1],
        });

        setStudyInfo({ ...studyInfo, thumbnail: newImageUrl });
      })();
    };
  };

  if (!user)
    return (
      <NoAccess
        title="이 페이지는 로그인한 사용자만 이용할 수 있습니다."
        description="책모이에 로그인하시면 다양한 서비스를 이용하실 수 있습니다."
      />
    );

  if (studyId && !isOwner)
    return (
      <NoAccess
        title="이 페이지는 스터디장만 이용할 수 있습니다."
        description="스터디장을 제외한 참여 인원은 사용하실 수 없습니다."
      />
    );

  return (
    <S.EntierContainer>
      <S.UpperContainer>
        <S.TextFieldContainer>
          <S.TextFieldWrapper>
            <TextField
              fullWidth
              name="bookTitle"
              variant="standard"
              label="책 제목"
              disabled
              value={studyInfo.bookTitle}
            />
          </S.TextFieldWrapper>
          <S.TextFieldWrapper>
            <TextField
              fullWidth
              name="name"
              variant="standard"
              label="스터디 이름 (최대 30자)"
              value={studyInfo.name}
              onChange={handleStudyInfoChange}
              error={!!inputError.name}
              helperText={inputError.name}
            />
          </S.TextFieldWrapper>
          <S.TextFieldWrapper>
            <TextField
              disabled={!!studyId}
              fullWidth
              name="maxParticipant"
              variant="standard"
              type="number"
              label="스터디 인원 (최대 10명)"
              value={studyInfo.maxParticipant}
              onChange={handleStudyInfoChange}
              error={!!inputError.maxParticipant}
              helperText={inputError.maxParticipant}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </S.TextFieldWrapper>
          <S.TextFieldWrapper>
            <TextField
              disabled={!!studyId}
              fullWidth
              name="gatherStartDate"
              variant="standard"
              type="date"
              label="스터디원 모집 시작"
              value={studyInfo.gatherStartDate}
              onChange={handleStudyInfoChange}
              error={!!inputError.gatherStartDate}
              helperText={inputError.gatherStartDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </S.TextFieldWrapper>
          <S.TextFieldWrapper>
            <TextField
              disabled={!!studyId}
              fullWidth
              name="gatherEndDate"
              variant="standard"
              type="date"
              label="스터디원 모집 마감"
              value={studyInfo.gatherEndDate}
              onChange={handleStudyInfoChange}
              error={!!inputError.gatherEndDate}
              helperText={inputError.gatherEndDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </S.TextFieldWrapper>
          <S.TextFieldWrapper>
            <TextField
              disabled={!!studyId}
              fullWidth
              name="studyStartDate"
              variant="standard"
              type="date"
              label="스터디 진행 시작"
              value={studyInfo.studyStartDate}
              onChange={handleStudyInfoChange}
              error={!!inputError.studyStartDate}
              helperText={inputError.studyStartDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </S.TextFieldWrapper>
          <S.TextFieldWrapper>
            <TextField
              disabled={!!studyId}
              fullWidth
              name="studyEndDate"
              variant="standard"
              type="date"
              label="스터디 진행 종료"
              value={studyInfo.studyEndDate}
              onChange={handleStudyInfoChange}
              error={!!inputError.studyEndDate}
              helperText={inputError.studyEndDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </S.TextFieldWrapper>
          <S.TextFieldWrapper>
            <TextField
              select
              fullWidth
              disabled={
                !studyId ||
                studyInfo.status === "inProgress" ||
                studyInfo.status === "finished"
              }
              name="status"
              variant="standard"
              label="스터디 모집 상태"
              value={studyInfo.status}
              onChange={handleStudyInfoChange}
              error={!!inputError.status}
              helperText={inputError.status}
            >
              <MenuItem key="status-recruting" value="recruiting">
                {STATUS.recruiting}
              </MenuItem>
              <MenuItem
                key="status-recrutingFinished"
                value="recruitingFinished"
              >
                {STATUS.recruitingFinished}
              </MenuItem>
            </TextField>
          </S.TextFieldWrapper>
        </S.TextFieldContainer>
        <S.ThumbnailContainer>
          <S.ThumbnailForm>
            <S.ThumbnailTypo>스터디 썸네일</S.ThumbnailTypo>
            <S.ThumbnailLabel htmlFor="fileInput">
              <S.ImageBox>
                {studyInfo.thumbnail && (
                  <Image src={studyInfo.thumbnail} width="300" height="450" />
                )}
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
        </S.ThumbnailContainer>
      </S.UpperContainer>
      <S.LowerContainer>
        <TextField
          fullWidth
          name="description"
          variant="outlined"
          label="스터디 내용"
          multiline
          minRows={5}
          value={studyInfo.description}
          onChange={handleStudyInfoChange}
          error={!!inputError.description}
          helperText={inputError.description}
        />
      </S.LowerContainer>
      <S.StudyOpenButton variant="outlined" onClick={handleOpenClick}>
        {studyId ? "스터디 수정하기" : "스터디 개설하기"}
      </S.StudyOpenButton>
    </S.EntierContainer>
  );
};
