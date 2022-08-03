import Image from "next/image";
import type { MouseEventHandler } from "react";
import { StudyType } from "../../types/studyType";
import * as S from "./style";
import { dummyStudy } from "../../commons/dummy";

interface StudyCardProps {
  study: StudyType;
  size: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const StudyCard = ({
  size = 128,
  study = dummyStudy,
  onClick,
}: StudyCardProps) => {
  const {
    thumbnailUrl,
    name,
    gatherStartDate,
    gatherEndDate,
    studyStartDate,
    studyEndDate,
    maxParticipant,
    currentParticipant,
  } = study;

  return (
    <S.StudyCard onClick={onClick}>
      <S.ImageWrapper>
        <Image width={size} height={size * 1.5} src={thumbnailUrl} />
      </S.ImageWrapper>
      <S.StudyInfoConatiner>
        <S.ResponsiveText fontSize={1.2}>{name}</S.ResponsiveText>
        <S.ResponsiveText>
          모집 인원 : {currentParticipant}/{maxParticipant}
        </S.ResponsiveText>
        <S.ResponsiveText>
          모집 기간 : {`${gatherStartDate} - ${gatherEndDate}`}
        </S.ResponsiveText>
        <S.ResponsiveText>
          진행 기간 : {`${studyStartDate} - ${studyEndDate}`}
        </S.ResponsiveText>
      </S.StudyInfoConatiner>
    </S.StudyCard>
  );
};
