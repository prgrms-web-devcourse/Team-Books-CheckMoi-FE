import Image from "next/image";
import { useState } from "react";
import { AvatarGroup, Avatar } from '@mui/material';
import { StudyState } from "./StudyState";
import * as S from "./style";

interface StudyDetailProps {
  size: number;
  src: string;
  title: string;
  gatherStartDate: Date;
  gatherEndDate: Date;
  studyStartDate: Date;
  studyEndDate: Date;
  maxParticipant: number;
  currentParticipant: number;
}

// TODO Image => future Image로 수정해야 함
export const StudyDetailCard = ({
  size = 128,
  src = "https://picsum.photos/200",
  title = "스터디 제목",
  gatherStartDate = new Date(2022, 7, 1),
  gatherEndDate = new Date(2022, 7, 31),
  studyStartDate = new Date(2022, 8, 1),
  studyEndDate = new Date(2022, 8, 30),
  maxParticipant = 16,
  currentParticipant = 0,
}: StudyDetailProps) => {
  const getYYYYMMDD = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = date.getMonth();
    const dd = date.getDate();

    return `${yyyy}/${mm}/${dd}`;
  };

  const [isGathering, setIsGathering] = useState(true);

  return (
    <S.StudyDetailCard>
      <S.ImageWrapper>
        <div>북카드 컴포넌트 넣기</div>
      </S.ImageWrapper>
      <S.StudyInfoContainer>
        <S.ResponsiveText fontSize={1.3}>{title}</S.ResponsiveText>
        {isGathering && (
          <S.ResponsiveText>
            모집 인원 : {currentParticipant}/{maxParticipant}
          </S.ResponsiveText>
        )}
        <S.ResponsiveText>
          모집 기간 : {getYYYYMMDD(gatherStartDate)} -{" "}
          {getYYYYMMDD(gatherEndDate)}
        </S.ResponsiveText>
        <S.ResponsiveText>
          {" "}
          진행 기간 : {getYYYYMMDD(studyStartDate)} -{" "}
          {getYYYYMMDD(studyEndDate)}
        </S.ResponsiveText>
      </S.StudyInfoContainer>
      <AvatarGroup max={2}>
        <Avatar src="https://picsum.photos/200"/>
        <Avatar src="https://picsum.photos/200"/>
        <Avatar src="https://picsum.photos/200"/>
      </AvatarGroup>
      <StudyState studyState="gathering"/>
    </S.StudyDetailCard>
  );
};
