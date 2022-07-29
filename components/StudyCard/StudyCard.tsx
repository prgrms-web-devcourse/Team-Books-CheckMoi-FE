import Image from "next/image";
import * as S from "./style";

interface StudyCardProps {
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

export const StudyCard = ({
  size = 128,
  src = "https://picsum.photos/200",
  title = "스터디 제목",
  gatherStartDate = new Date(2022, 7, 1),
  gatherEndDate = new Date(2022, 7, 31),
  studyStartDate = new Date(2022, 8, 1),
  studyEndDate = new Date(2022, 8, 30),
  maxParticipant = 16,
  currentParticipant = 0,
}: StudyCardProps) => {
  const getYYYYMMDD = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = date.getMonth();
    const dd = date.getDate();

    return `${yyyy}/${mm}/${dd}`;
  };

  return (
    <S.StudyCard>
      <S.ImageWrapper>
        <Image width={size} height={size * 1.5} src={src} />
      </S.ImageWrapper>
      <S.StudyInfoConatiner>
        <S.ResponsiveText fontSize={1.2}>{title}</S.ResponsiveText>
        <S.ResponsiveText>
          모집 인원 : {currentParticipant}/{maxParticipant}
        </S.ResponsiveText>
        <S.ResponsiveText>
          모집 기간 : {getYYYYMMDD(gatherStartDate)} -{" "}
          {getYYYYMMDD(gatherEndDate)}
        </S.ResponsiveText>
        <S.ResponsiveText>
          진행 기간 : {getYYYYMMDD(studyStartDate)} -{" "}
          {getYYYYMMDD(studyEndDate)}
        </S.ResponsiveText>
      </S.StudyInfoConatiner>
    </S.StudyCard>
  );
};
