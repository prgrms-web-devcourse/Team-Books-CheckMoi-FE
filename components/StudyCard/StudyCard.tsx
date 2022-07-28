import Image from "next/image";
import * as S from "./style";

interface StudyCardProps {
  size: number;
  src: string;
  title: string;
  gatherStartDate: string;
  gatherEndDate: string;
  studyStartDate: string;
  studyEndDate: string;
  maxParticipant: number;
  currentParticipant: number;
}

// TODO defaultValue 수정
export const StudyCard = ({
  size = 128,
  src = "https://picsum.photos/200",
  title = "스터디 제목",
  gatherStartDate = new Date(2022, 8, 31).toString(),
  gatherEndDate = new Date(2022, 8, 31).toString(),
  studyStartDate = new Date(2022, 8, 31).toString(),
  studyEndDate = new Date(2022, 8, 31).toString(),
  maxParticipant = 16,
  currentParticipant = 0,
}: StudyCardProps) => {
  return (
    <S.StudyCard sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
      <S.ImageWrapper>
        <Image
          layout="fixed"
          width={size}
          height={size * 1.5}
          src={src}
          style={{ flexShrink: 0 }}
        />
      </S.ImageWrapper>
      <S.StudyInfoConatiner>
        <S.ResponsiveTextWrapper>
          <S.ResponsiveText>{title}</S.ResponsiveText>
        </S.ResponsiveTextWrapper>
        <S.ResponsiveText>
          모집 기간 : {gatherStartDate} - {gatherEndDate}
        </S.ResponsiveText>
        <S.ResponsiveText>
          모집 인원 : {currentParticipant}/{maxParticipant}
        </S.ResponsiveText>
        <S.ResponsiveText>
          진행 기간 : {studyStartDate} - {studyEndDate}
        </S.ResponsiveText>
      </S.StudyInfoConatiner>
    </S.StudyCard>
  );
};
